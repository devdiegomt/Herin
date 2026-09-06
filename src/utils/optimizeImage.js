/**
 * Optimiza una foto en el navegador ANTES de subirla a Supabase Storage.
 *
 * Por qué: el panel se usa desde el celular, y una foto sale de la cámara con
 * 1600x1400 y varios MB. El catálogo muestra 20+ fotos a la vez, así que sin
 * esto la página se vuelve lentísima en datos móviles — justo el público que
 * llega desde Instagram.
 *
 * Qué hace: reescala al lado largo máximo, convierte a WebP y comprime.
 * Si algo falla (formato raro, canvas bloqueado, HEIC no soportado) devuelve
 * el archivo original: nunca impide subir una foto.
 */

// La foto más grande se ve en el detalle (~600px CSS). x2 por pantallas retina.
const MAX_SIDE = 1200
const QUALITY = 0.82

// Formatos que no tiene sentido (o no se puede) pasar por canvas.
const SKIP_TYPES = ['image/svg+xml', 'image/gif']

/**
 * @param {File} file
 * @returns {Promise<{file: File, originalBytes: number, bytes: number, changed: boolean}>}
 */
export async function optimizeImage(file) {
  const original = {
    file,
    originalBytes: file.size,
    bytes: file.size,
    changed: false,
  }

  if (!file.type.startsWith('image/') || SKIP_TYPES.includes(file.type)) {
    return original
  }
  // Ya lo procesamos en este mismo flujo (ver uploadProductImage)
  if (file.__herinOptimized) return original

  try {
    const bitmap = await loadBitmap(file)
    const { width, height } = fit(bitmap.width, bitmap.height, MAX_SIDE)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return original
    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close?.()

    const mime = supportsWebp(canvas) ? 'image/webp' : 'image/jpeg'
    const blob = await toBlob(canvas, mime, QUALITY)
    if (!blob) return original

    // Si "optimizar" engorda el archivo (ya venía comprimido y pequeño),
    // nos quedamos con el original.
    if (blob.size >= file.size) return original

    const ext = mime === 'image/webp' ? 'webp' : 'jpg'
    const name = file.name.replace(/\.[^.]+$/, '') + '.' + ext
    const out = new File([blob], name, { type: mime, lastModified: Date.now() })
    out.__herinOptimized = true

    return {
      file: out,
      originalBytes: file.size,
      bytes: out.size,
      changed: true,
    }
  } catch {
    // Cualquier problema: se sube tal cual venía.
    return original
  }
}

/** Optimiza varias fotos en serie, reportando el avance. */
export async function optimizeAll(files, onProgress) {
  const out = []
  for (let i = 0; i < files.length; i++) {
    onProgress?.(i, files.length)
    out.push(await optimizeImage(files[i]))
  }
  onProgress?.(files.length, files.length)
  return out
}

/** Formatea bytes para mostrárselos a una persona: 1536000 -> "1,5 MB" */
export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1).replace('.', ',')} MB`
}

// --- internos ---

// createImageBitmap respeta la orientación EXIF: sin esto, las fotos tomadas
// en vertical con el celular se suben acostadas.
async function loadBitmap(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // Safari viejo no acepta la opción: reintenta sin ella
      try {
        return await createImageBitmap(file)
      } catch {
        /* cae al <img> */
      }
    }
  }
  return loadViaImgTag(file)
}

function loadViaImgTag(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo leer la imagen'))
    }
    img.src = url
  })
}

// Reduce manteniendo proporción. Nunca agranda.
function fit(w, h, max) {
  const scale = Math.min(1, max / Math.max(w, h))
  return {
    width: Math.max(1, Math.round(w * scale)),
    height: Math.max(1, Math.round(h * scale)),
  }
}

function supportsWebp(canvas) {
  return canvas.toDataURL('image/webp').startsWith('data:image/webp')
}

function toBlob(canvas, mime, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality))
}
