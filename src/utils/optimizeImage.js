/**
 * Optimiza una foto en el navegador ANTES de subirla a Supabase Storage.
 *
 * Por qué: el panel se usa desde el celular, y una foto sale de la cámara con
 * 1600x1400 y varios MB. El catálogo muestra 20+ fotos a la vez, así que sin
 * esto la página se vuelve lentísima en datos móviles — justo el público que
 * llega desde Instagram.
 *
 * Qué hace: reescala al lado largo máximo, convierte a WebP y comprime.
 *
 * HEIC / HEIF (fotos de iPhone) se convierten SIEMPRE. Fuera de Safari ningún
 * navegador los puede mostrar, así que subirlos tal cual dejaría fotos rotas en
 * el catálogo. Si la conversión falla se lanza un ImageError con un mensaje
 * para la persona. Con cualquier otro formato, un fallo sube el original.
 */

// La foto más grande se ve en el detalle (~600px CSS). x2 por pantallas retina.
const MAX_SIDE = 1200
const QUALITY = 0.82

// Una conversión HEIC normal tarda 1-2 s (algo más la primera vez, que descarga
// el decodificador). Pasado este tope se asume que se colgó: mejor avisar que
// dejar la pantalla en "Optimizando…" para siempre, que es lo que pasaba con
// heic2any y los HEIF de 10 bits de los iPhone recientes.
const HEIC_TIMEOUT_MS = 60000

// Formatos que no tiene sentido (o no se puede) pasar por canvas.
const SKIP_TYPES = ['image/svg+xml', 'image/gif']

// Marcas de la caja "ftyp" con que empieza un archivo HEIF.
const HEIF_BRANDS = ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1']

/** Error con un mensaje pensado para mostrárselo a la persona tal cual. */
export class ImageError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ImageError'
  }
}

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

  // Ya lo procesamos en este mismo flujo (ver uploadProductImage)
  if (file.__herinOptimized) return original

  // HEIC se detecta ANTES de mirar el tipo: Chrome en Windows y muchos Android
  // lo entregan con file.type vacío, y la guarda de abajo lo descartaba sin
  // convertirlo.
  const heic = await isHeicFile(file)

  if (!heic && (!file.type.startsWith('image/') || SKIP_TYPES.includes(file.type))) {
    return original
  }

  let bitmap
  try {
    bitmap = heic ? await decodeHeic(file) : await loadBitmap(file)
  } catch (err) {
    // decodeHeic ya trae un mensaje para la persona
    if (heic) throw err
    return original
  }

  try {
    const { width, height } = fit(bitmap.width, bitmap.height, MAX_SIDE)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas no disponible')
    ctx.drawImage(bitmap, 0, 0, width, height)

    const mime = supportsWebp(canvas) ? 'image/webp' : 'image/jpeg'
    const blob = await toBlob(canvas, mime, QUALITY)
    if (!blob) throw new Error('el canvas no generó imagen')

    // Si "optimizar" engorda el archivo (ya venía comprimido y pequeño),
    // nos quedamos con el original. Un HEIC nunca: no se puede mostrar.
    if (!heic && blob.size >= file.size) return original

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
    if (heic) throw new ImageError(cannotConvert(file))
    // Cualquier otro formato: se sube tal cual venía.
    return original
  } finally {
    bitmap.close?.()
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

/**
 * ¿Es un HEIC/HEIF? Mira el tipo, la extensión y, sobre todo, el contenido:
 * el tipo suele venir vacío y hay fotos renombradas. Leer 12 bytes no cuesta
 * nada. Si se confunde con un AVIF (comparten formato contenedor) no pasa
 * nada: decodeHeic prueba primero el decodificador nativo, que sí lo abre.
 */
export async function isHeicFile(file) {
  if (/image\/hei[cf]/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)) return true
  try {
    const head = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    const box = String.fromCharCode(...head.slice(4, 8))
    const brand = String.fromCharCode(...head.slice(8, 12))
    return box === 'ftyp' && HEIF_BRANDS.includes(brand)
  } catch {
    return false
  }
}

// --- internos ---

async function decodeHeic(file) {
  // Safari (iPhone, Mac) decodifica HEIC de forma nativa: no hace falta
  // descargar nada.
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    /* Chrome, Edge y Firefox no lo soportan: seguimos con heic-to */
  }

  let heicTo
  try {
    // Import dinámico: el decodificador pesa ~3 MB y solo lo usa el panel.
    // Con un import estático viajaba en el bundle de todo el que visita el
    // catálogo. La build "csp" es la misma pero sin eval.
    ;({ heicTo } = await import('heic-to/csp'))
  } catch {
    throw new ImageError(
      'No se pudo cargar el conversor de fotos HEIC. Revisa la conexión e inténtalo de nuevo.',
    )
  }

  try {
    // "bitmap" entrega la foto ya decodificada: nos ahorramos un JPEG intermedio
    // y comprimir dos veces. heic-to decodifica en un Worker, así que el tope
    // de tiempo sí puede cortar un cuelgue.
    return await withTimeout(heicTo({ blob: file, type: 'bitmap' }), HEIC_TIMEOUT_MS)
  } catch {
    throw new ImageError(cannotConvert(file))
  }
}

function cannotConvert(file) {
  return (
    `No se pudo convertir "${file.name}". ` +
    'Para evitarlo en el iPhone: Ajustes → Cámara → Formatos → Más compatible.'
  )
}

function withTimeout(promise, ms) {
  let timer
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('tiempo agotado')), ms)
    }),
  ]).finally(() => clearTimeout(timer))
}

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
