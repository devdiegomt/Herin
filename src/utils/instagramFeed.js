/**
 * Lee un feed JSON de Instagram servido por un tercero (Behold u otro) y lo
 * deja en la forma que usa la grilla del sitio.
 *
 * Está escrito para no atarnos a un proveedor: acepta tanto un objeto con
 * `posts` (lo que devuelve Behold) como un array pelado (lo que devuelven
 * otros), y busca los campos por varios nombres posibles. Si mañana cambias de
 * servicio, lo más probable es que solo haya que cambiar la URL.
 */

// Guardamos el resultado en la pestaña para no volver a pedirlo al navegar
// entre el catálogo y una ficha de producto.
const CACHE_KEY = 'herin:ig-feed'
const CACHE_MINUTES = 15

/**
 * @param {string} url
 * @param {number} limit
 * @returns {Promise<Array<{id, image, href, alt, isVideo}>>}
 */
export async function loadInstagramFeed(url, limit = 6) {
  const cached = readCache(url)
  if (cached) return cached.slice(0, limit)

  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`feed HTTP ${res.status}`)

  const posts = normalizeFeed(await res.json())
  if (!posts.length) throw new Error('el feed no trajo publicaciones')

  writeCache(url, posts)
  return posts.slice(0, limit)
}

/** Convierte la respuesta del proveedor en nuestra forma. Exportada para poder probarla. */
export function normalizeFeed(data) {
  const raw = Array.isArray(data) ? data : (data?.posts ?? data?.data ?? [])
  if (!Array.isArray(raw)) return []

  return raw
    // Behold deja ocultar publicaciones desde su panel: si marcas una como
    // oculta, no debe aparecer en el sitio.
    .filter((item) => !item?.visibility || item.visibility === 'visible')
    .map(toPost)
    .filter((p) => p.image && p.href)
}

function toPost(item, index) {
  const isVideo = String(item?.mediaType ?? item?.media_type ?? '')
    .toUpperCase()
    .includes('VIDEO')

  return {
    id: item?.id ?? `post-${index}`,
    // Behold calcula el color dominante de cada foto. Lo usamos como fondo del
    // recuadro para que no haya un parpadeo gris mientras la imagen carga.
    placeholder: toRgb(item?.colorPalette?.dominant),
    // En un video, mediaUrl es el archivo de video: hay que usar la miniatura.
    // `sizes.medium` pesa mucho menos que la original y en la grilla se ve igual.
    image:
      pickSize(item?.sizes) ??
      item?.thumbnailUrl ??
      item?.thumbnail_url ??
      (isVideo ? null : item?.mediaUrl ?? item?.media_url) ??
      null,
    href: item?.permalink ?? item?.link ?? null,
    alt: buildAlt(item),
    isVideo,
  }
}

// "180,116,52" -> "rgb(180,116,52)". Devuelve null si no viene o viene raro.
function toRgb(triplet) {
  if (typeof triplet !== 'string') return null
  const parts = triplet.split(',').map((n) => Number(n.trim()))
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null
  return `rgb(${parts.join(',')})`
}

// Behold entrega varias resoluciones; para una grilla de 6 basta la mediana.
function pickSize(sizes) {
  if (!sizes) return null
  const candidate = sizes.medium ?? sizes.small ?? sizes.large ?? sizes.full
  if (!candidate) return null
  // Puede venir como string o como { mediaUrl, width, height }
  return typeof candidate === 'string'
    ? candidate
    : candidate.mediaUrl ?? candidate.url ?? null
}

// El texto alternativo sale del pie de la publicación, recortado y en una línea.
function buildAlt(item) {
  const text =
    item?.altText ??
    item?.prunedCaption ??
    item?.caption ??
    ''
  const clean = String(text).replace(/\s+/g, ' ').trim()
  if (!clean) return 'Publicación de Herin en Instagram'
  return clean.length > 120 ? `${clean.slice(0, 117)}…` : clean
}

// --- Caché de sesión ---

function readCache(url) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { url: cachedUrl, at, posts } = JSON.parse(raw)
    if (cachedUrl !== url) return null
    if (Date.now() - at > CACHE_MINUTES * 60 * 1000) return null
    return Array.isArray(posts) ? posts : null
  } catch {
    // Modo incógnito o almacenamiento bloqueado: seguimos sin caché.
    return null
  }
}

function writeCache(url, posts) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ url, at: Date.now(), posts }))
  } catch {
    /* sin caché, no pasa nada */
  }
}
