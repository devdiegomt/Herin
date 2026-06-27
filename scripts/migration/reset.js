/**
 * Limpia TODOS los productos e imágenes de Herin en Supabase.
 * Úsalo solo si quieres volver a correr la migración desde cero.
 *
 * Cómo correrlo (necesita ADMIN_EMAIL y ADMIN_PASSWORD en el .env, igual que migrate.js):
 *   node scripts/migration/reset.js
 *
 * OJO: esto borra los productos y las imágenes registradas en la base.
 * Las categorías NO se tocan.
 */

import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..', '..')

async function loadEnv() {
  const raw = await readFile(join(projectRoot, '.env'), 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
}

const BUCKET = 'product-images'

async function main() {
  await loadEnv()
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  )

  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  })
  if (authErr) {
    console.error('No pude iniciar sesión:', authErr.message)
    process.exit(1)
  }

  // Borrar archivos del Storage
  const { data: imgs } = await supabase
    .from('product_images')
    .select('storage_path')
  const paths = (imgs ?? []).map((i) => i.storage_path).filter(Boolean)
  if (paths.length) {
    await supabase.storage.from(BUCKET).remove(paths)
    console.log(`Borradas ${paths.length} imágenes del Storage.`)
  }

  // Borrar productos (product_images se borra en cascada por la FK)
  const { error } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) {
    console.error('Error borrando productos:', error.message)
    process.exit(1)
  }

  console.log('Productos e imágenes eliminados. Puedes correr migrate.js de nuevo.')
  await supabase.auth.signOut()
}

main().catch((err) => {
  console.error('Error inesperado:', err)
  process.exit(1)
})
