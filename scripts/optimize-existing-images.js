/**
 * Optimiza las fotos que YA están subidas a Supabase Storage.
 *
 * Contexto: hasta ahora el panel subía las fotos tal cual salían del celular
 * (hay imágenes de 1600px y varios cientos de KB). Las fotos NUEVAS ya se
 * reducen solas en el navegador (src/utils/optimizeImage.js); este script es
 * para ponerse al día con las viejas, una sola vez.
 *
 * Qué hace por cada foto que lo necesite:
 *   1. La descarga de Storage.
 *   2. La reescala a 1200px de lado largo y la convierte a WebP (calidad 82),
 *      corrigiendo la orientación EXIF.
 *   3. Sube el resultado con un nombre NUEVO (nunca sobrescribe el original).
 *   4. Actualiza url y storage_path en la tabla product_images.
 *   5. Deja el archivo viejo en Storage como respaldo, salvo que pidas borrarlo.
 *
 * --------------------------------------------------------------------------
 * CÓMO CORRERLO
 *
 *   1. Ten el .env en la raíz con:
 *        VITE_SUPABASE_URL=...
 *        VITE_SUPABASE_PUBLISHABLE_KEY=...
 *
 *   2. Agrega TEMPORALMENTE las credenciales del usuario admin:
 *        ADMIN_EMAIL=correo@ejemplo.com
 *        ADMIN_PASSWORD=la-contraseña
 *
 *   3. Primero mira qué haría, sin tocar nada (esto es lo que corre por defecto):
 *        node scripts/optimize-existing-images.js
 *
 *   4. Si te convence, aplícalo de verdad:
 *        node scripts/optimize-existing-images.js --apply
 *
 *   5. BORRA ADMIN_EMAIL y ADMIN_PASSWORD del .env.
 *
 * OPCIONES
 *   --apply               Escribe los cambios. Sin esto es simulacro (dry-run).
 *   --limit N             Procesa solo las primeras N fotos (para probar).
 *   --max-side N          Lado largo máximo en px. Por defecto 1200.
 *   --quality N           Calidad WebP 1-100. Por defecto 82.
 *   --delete-originals    Borra el archivo viejo de Storage tras actualizar.
 *                         Por defecto NO se borra, para poder revertir.
 *   --rollback <archivo>  Restaura url/storage_path desde un respaldo previo.
 *
 * SI ALGO SALE MAL
 *   Cada corrida con --apply guarda un respaldo en scripts/backups/.
 *   Como los archivos viejos siguen en Storage, revertir es:
 *     node scripts/optimize-existing-images.js --rollback scripts/backups/ARCHIVO.json
 * --------------------------------------------------------------------------
 */

import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const BUCKET = 'product-images'

// Un año: cada foto tiene nombre único, así que nunca cambia bajo la misma URL.
const CACHE_CONTROL = '31536000'

// --- Opciones de línea de comandos ---
const argv = process.argv.slice(2)
const flag = (name) => argv.includes(name)
const value = (name, fallback) => {
  const i = argv.indexOf(name)
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback
}

const options = {
  apply: flag('--apply'),
  limit: Number(value('--limit', 0)) || 0,
  maxSide: Number(value('--max-side', 1200)) || 1200,
  quality: Number(value('--quality', 82)) || 82,
  deleteOriginals: flag('--delete-originals'),
  rollbackFile: value('--rollback', null),
}

main().catch((err) => {
  console.error('\nError inesperado:', err)
  process.exit(1)
})

async function main() {
  await loadEnv()
  const supabase = await signIn()

  if (options.rollbackFile) {
    await rollback(supabase, options.rollbackFile)
    return
  }

  await optimize(supabase)
}

// =====================================================================
// Optimización
// =====================================================================

async function optimize(supabase) {
  const { data: rows, error } = await supabase
    .from('product_images')
    .select('id, url, storage_path, product_id, is_primary, sort_order')
    .order('product_id')

  if (error) {
    console.error('No pude leer product_images:', error.message)
    process.exit(1)
  }

  const all = options.limit ? rows.slice(0, options.limit) : rows
  console.log(`\n${all.length} foto(s) en la base.`)
  console.log(
    options.apply
      ? 'Modo APLICAR: se van a escribir los cambios.\n'
      : 'Modo SIMULACRO: no se escribe nada. Usa --apply cuando estés listo.\n',
  )

  const backup = []
  let optimized = 0
  let skipped = 0
  let failed = 0
  let bytesBefore = 0
  let bytesAfter = 0

  for (let i = 0; i < all.length; i++) {
    const row = all[i]
    const tag = `[${String(i + 1).padStart(2)}/${all.length}]`
    const label = row.storage_path || row.url

    try {
      const original = await download(row.url)
      const meta = await sharp(original).metadata()

      if (!needsWork(meta, original.length)) {
        console.log(`${tag} ↷ ${label} — ya está bien (${meta.width}x${meta.height}, ${kb(original.length)})`)
        skipped++
        continue
      }

      const output = await sharp(original)
        // .rotate() sin argumentos aplica la orientación EXIF y la limpia:
        // sin esto las fotos verticales del celular quedan acostadas.
        .rotate()
        .resize(options.maxSide, options.maxSide, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: options.quality })
        .toBuffer()

      const outMeta = await sharp(output).metadata()

      // Si no ahorramos al menos un 5%, no vale la pena rotar el archivo.
      const saving = 1 - output.length / original.length
      if (saving < 0.05) {
        console.log(`${tag} ↷ ${label} — sin ganancia real (${Math.round(saving * 100)}%)`)
        skipped++
        continue
      }

      bytesBefore += original.length
      bytesAfter += output.length

      console.log(
        `${tag} ✓ ${label}\n` +
        `        ${meta.width}x${meta.height} ${meta.format} ${kb(original.length)}` +
        `  →  ${outMeta.width}x${outMeta.height} webp ${kb(output.length)}` +
        `  (−${Math.round(saving * 100)}%)`,
      )

      if (!options.apply) {
        optimized++
        continue
      }

      // --- Escritura: nombre nuevo, nunca sobrescribimos el original ---
      const newPath = buildPath(row.storage_path)

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(newPath, output, {
          contentType: 'image/webp',
          upsert: false,
          cacheControl: CACHE_CONTROL,
        })
      if (upErr) throw new Error(`subiendo: ${upErr.message}`)

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(newPath)

      const { error: dbErr } = await supabase
        .from('product_images')
        .update({ url: pub.publicUrl, storage_path: newPath })
        .eq('id', row.id)

      if (dbErr) {
        // La base manda: si no se pudo actualizar, quitamos el archivo nuevo
        // para no dejar basura huérfana en Storage.
        await supabase.storage.from(BUCKET).remove([newPath])
        throw new Error(`actualizando la base: ${dbErr.message}`)
      }

      backup.push({
        id: row.id,
        oldUrl: row.url,
        oldPath: row.storage_path,
        newUrl: pub.publicUrl,
        newPath,
      })

      // Recién ahora, con la base ya apuntando al archivo nuevo, es seguro
      // borrar el viejo. Por defecto lo dejamos como respaldo.
      if (options.deleteOriginals && row.storage_path) {
        const { error: rmErr } = await supabase.storage
          .from(BUCKET)
          .remove([row.storage_path])
        if (rmErr) console.warn(`        (no pude borrar el original: ${rmErr.message})`)
      }

      optimized++
    } catch (err) {
      console.error(`${tag} ✗ ${label} — ${err.message}`)
      failed++
    }
  }

  // --- Respaldo ---
  let backupPath = null
  if (options.apply && backup.length) {
    const dir = join(projectRoot, 'scripts', 'backups')
    await mkdir(dir, { recursive: true })
    backupPath = join(dir, `imagenes-${stamp()}.json`)
    await writeFile(backupPath, JSON.stringify(backup, null, 2), 'utf8')
  }

  // --- Resumen ---
  console.log('\n─────────────────────────────')
  console.log(`Optimizadas: ${optimized}`)
  console.log(`Saltadas:    ${skipped}`)
  console.log(`Fallidas:    ${failed}`)
  if (bytesBefore) {
    console.log(
      `Peso:        ${kb(bytesBefore)} → ${kb(bytesAfter)} ` +
      `(−${Math.round((1 - bytesAfter / bytesBefore) * 100)}%)`,
    )
  }
  console.log('─────────────────────────────')

  if (!options.apply && optimized > 0) {
    console.log('\nEsto fue un simulacro. Para aplicarlo:')
    console.log('  node scripts/optimize-existing-images.js --apply')
  }
  if (backupPath) {
    console.log(`\nRespaldo guardado en:\n  ${backupPath}`)
    if (!options.deleteOriginals) {
      console.log('Los archivos viejos siguen en Storage, así que puedes revertir con:')
      console.log(`  node scripts/optimize-existing-images.js --rollback "${backupPath}"`)
    } else {
      console.log('OJO: usaste --delete-originals, así que el rollback ya no es posible.')
    }
  }
  console.log('\nNo olvides BORRAR ADMIN_EMAIL y ADMIN_PASSWORD del .env.')
}

// =====================================================================
// Rollback
// =====================================================================

async function rollback(supabase, file) {
  let entries
  try {
    entries = JSON.parse(await readFile(file, 'utf8'))
  } catch {
    console.error(`No pude leer el respaldo: ${file}`)
    process.exit(1)
  }

  console.log(`\nRestaurando ${entries.length} foto(s) desde el respaldo.`)
  console.log(
    options.apply
      ? 'Modo APLICAR.\n'
      : 'Modo SIMULACRO: no se escribe nada. Agrega --apply para restaurar de verdad.\n',
  )

  let done = 0
  let failed = 0

  for (const e of entries) {
    // Solo restauramos si el archivo viejo sigue existiendo en Storage.
    const alive = await exists(e.oldUrl)
    if (!alive) {
      console.error(`✗ ${e.oldPath} — el archivo original ya no está en Storage.`)
      failed++
      continue
    }

    if (!options.apply) {
      console.log(`· ${e.newPath} → ${e.oldPath}`)
      done++
      continue
    }

    const { error } = await supabase
      .from('product_images')
      .update({ url: e.oldUrl, storage_path: e.oldPath })
      .eq('id', e.id)

    if (error) {
      console.error(`✗ ${e.oldPath} — ${error.message}`)
      failed++
      continue
    }

    // Quita la versión optimizada, que ya nadie referencia.
    await supabase.storage.from(BUCKET).remove([e.newPath])
    console.log(`✓ ${e.oldPath}`)
    done++
  }

  console.log('\n─────────────────────────────')
  console.log(`Restauradas: ${done}`)
  console.log(`Fallidas:    ${failed}`)
  console.log('─────────────────────────────')
}

// =====================================================================
// Helpers
// =====================================================================

// Una foto necesita trabajo si es más grande de lo que el sitio muestra,
// si pesa de más, o si no está en WebP.
function needsWork(meta, bytes) {
  const tooBig = meta.width > options.maxSide || meta.height > options.maxSide
  const tooHeavy = bytes > 150 * 1024
  const notWebp = meta.format !== 'webp'
  return tooBig || tooHeavy || notWebp
}

// Mantiene la carpeta del producto y genera un nombre único, igual que hace
// uploadProductImage en el sitio.
function buildPath(oldPath) {
  const folder = oldPath?.includes('/') ? oldPath.split('/')[0] : 'producto'
  const rand = Math.random().toString(36).slice(2, 8)
  return `${folder}/${Date.now()}-${rand}.webp`
}

async function download(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`descargando (HTTP ${res.status})`)
  return Buffer.from(await res.arrayBuffer())
}

async function exists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

function kb(bytes) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

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

async function signIn() {
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
      'Agrégalos temporalmente (credenciales del usuario admin) y vuelve a correr.\n' +
      'Se necesitan porque escribir en Storage y en la base requiere sesión.',
    )
    process.exit(1)
  }

  const supabase = createClient(url, key)
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('No pude iniciar sesión:', error.message)
    process.exit(1)
  }
  return supabase
}
