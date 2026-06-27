/**
 * Migración inicial de productos de Herin → Supabase.
 *
 * Qué hace:
 *   1. Inicia sesión con el usuario admin (tu mamá) para tener permisos de escritura.
 *   2. Por cada producto del manifiesto:
 *        - sube sus imágenes al bucket 'product-images' del Storage
 *        - inserta el producto en la tabla 'products'
 *        - registra cada imagen en 'product_images' (la 1ª como principal)
 *   3. Es idempotente: si un producto ya existe (mismo slug), lo salta.
 *
 * Cómo correrlo:
 *   1. Asegúrate de tener el archivo .env en la raíz del proyecto con:
 *        VITE_SUPABASE_URL=...
 *        VITE_SUPABASE_PUBLISHABLE_KEY=...
 *   2. Agrega TEMPORALMENTE estas dos líneas al .env (las credenciales de tu mamá):
 *        ADMIN_EMAIL=correo-de-tu-mama@ejemplo.com
 *        ADMIN_PASSWORD=su-contraseña
 *   3. Desde la raíz del proyecto, corre:
 *        node scripts/migration/migrate.js
 *   4. Cuando termine, BORRA del .env las líneas ADMIN_EMAIL y ADMIN_PASSWORD.
 *
 * Nota: usa fetch nativo de Node 18+. No requiere instalar nada extra
 *       más allá de @supabase/supabase-js, que ya está en el proyecto.
 */

import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename } from 'node:path'
import { productManifest } from './manifest.js'

// --- Carga manual del .env (sin dependencias extra) ---
const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..', '..')

async function loadEnv() {
  try {
    const raw = await readFile(join(projectRoot, '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    console.error('No encontré el archivo .env en la raíz del proyecto.')
    process.exit(1)
  }
}

function slugify(txt) {
  return txt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const BUCKET = 'product-images'

async function main() {
  await loadEnv()

  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!url || !key) {
    console.error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en el .env')
    process.exit(1)
  }
  if (!email || !password) {
    console.error(
      'Faltan ADMIN_EMAIL y ADMIN_PASSWORD en el .env.\n' +
      'Agrégalos temporalmente (credenciales del usuario admin) y vuelve a correr.'
    )
    process.exit(1)
  }

  const supabase = createClient(url, key)

  // 1. Login admin
  console.log('Iniciando sesión como admin...')
  const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
  if (authErr) {
    console.error('No pude iniciar sesión:', authErr.message)
    console.error('Verifica el correo y contraseña del usuario admin que creaste en Supabase.')
    process.exit(1)
  }
  console.log('Sesión iniciada.\n')

  // 2. Mapa de categorías (slug -> id)
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .select('id, slug')
  if (catErr) {
    console.error('No pude leer las categorías:', catErr.message)
    process.exit(1)
  }
  const catId = Object.fromEntries(cats.map((c) => [c.slug, c.id]))

  let created = 0
  let skipped = 0
  let failed = 0

  // 3. Por cada producto
  for (let i = 0; i < productManifest.length; i++) {
    const p = productManifest[i]
    const prefix = `[${i + 1}/${productManifest.length}]`
    const slug = slugify(p.name)

    // ¿ya existe?
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (existing) {
      console.log(`${prefix} ↷ "${p.name}" ya existe, lo salto.`)
      skipped++
      continue
    }

    try {
      // Insertar producto
      const { data: prod, error: prodErr } = await supabase
        .from('products')
        .insert({
          name: p.name,
          slug,
          category_id: catId[p.category] ?? null,
          description: p.description,
          description_long: p.description_long,
          price: p.price,
          tag: p.tag,
          active: true,
          sort_order: i,
        })
        .select('id')
        .single()

      if (prodErr) throw prodErr

      // Subir imágenes y registrarlas
      for (let j = 0; j < p.images.length; j++) {
        const localPath = join(projectRoot, 'public', p.images[j])
        const fileBuffer = await readFile(localPath)
        const fileName = `${slug}/${basename(p.images[j])}`

        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, fileBuffer, {
            contentType: 'image/webp',
            upsert: true,
          })
        if (upErr) throw upErr

        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(fileName)

        const { error: imgErr } = await supabase.from('product_images').insert({
          product_id: prod.id,
          url: pub.publicUrl,
          storage_path: fileName,
          is_primary: j === 0,
          sort_order: j,
        })
        if (imgErr) throw imgErr
      }

      console.log(`${prefix} ✓ "${p.name}" creado con ${p.images.length} foto(s).`)
      created++
    } catch (err) {
      console.error(`${prefix} ✗ Error con "${p.name}":`, err.message)
      failed++
    }
  }

  console.log('\n─────────────────────────────')
  console.log(`Creados:  ${created}`)
  console.log(`Saltados: ${skipped}`)
  console.log(`Fallidos: ${failed}`)
  console.log('─────────────────────────────')
  console.log('\nListo. Abre tu sitio y revisa el catálogo.')
  console.log('No olvides BORRAR ADMIN_EMAIL y ADMIN_PASSWORD del .env.')

  await supabase.auth.signOut()
}

main().catch((err) => {
  console.error('Error inesperado:', err)
  process.exit(1)
})
