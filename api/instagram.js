/**
 * Proxy cacheado del feed de Instagram (Behold).
 *
 * POR QUÉ EXISTE
 * El plan gratuito de Behold permite 1.200 lecturas al mes. Si cada visitante
 * pidiera el feed directamente, una racha de tráfico desde Instagram lo
 * agotaría en días y la sección se caería a las fotos de respaldo.
 *
 * Con esta función en medio, el CDN de Vercel guarda la respuesta y atiende a
 * casi todo el mundo sin salir a internet. A Behold solo le llegan unas pocas
 * lecturas al día, entren 50 personas o 50.000.
 *
 * A cambio, una publicación nueva puede tardar hasta un par de horas en
 * aparecer en el sitio. Para una landing es un intercambio que vale la pena.
 *
 * SI ALGO FALLA
 * Devuelve el error como JSON y el sitio se queda con sus fotos de respaldo
 * (ver src/components/InstagramFeed.jsx). La sección nunca queda vacía.
 */

import { contact } from '../src/config/site.js'

/**
 * 6 h en el CDN; durante las 24 h siguientes sirve lo viejo mientras refresca
 * por detrás, así un fallo de Behold nunca se nota.
 *
 * La cuenta: Vercel cachea por región, y el tráfico de Herin toca 2-3 regiones.
 * A 6 h son ~4 lecturas diarias por región, unas 360 al mes — cómodo bajo el
 * tope de 1.200 del plan gratuito. Con 2 h la cuenta daba ~1.080, demasiado
 * ajustado. Si algún día se pasa a un plan de pago, se puede bajar.
 */
const CACHE = 'public, s-maxage=21600, stale-while-revalidate=86400'

export default async function handler(req, res) {
  const source = contact.instagramSourceUrl

  if (!source) {
    return fail(res, 501, 'No hay feed de Instagram configurado.')
  }

  try {
    const upstream = await fetch(source, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (!upstream.ok) {
      return fail(res, 502, `Behold respondió ${upstream.status}.`)
    }

    const data = await upstream.json()

    // Nos quedamos solo con lo que la grilla usa. El feed trae biografía,
    // número de seguidores y las URLs originales de Instagram, que no
    // necesitamos publicar en nuestro dominio.
    const posts = (data?.posts ?? []).slice(0, 12).map(trim)

    // Una respuesta vacía casi siempre es un problema pasajero (feed recién
    // creado, cambio de formato). No la cacheamos dos horas: el sitio se cae
    // al respaldo mientras tanto y se recupera solo en cuanto Behold responda.
    if (!posts.length) {
      return fail(res, 502, 'El feed no trajo publicaciones.')
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', CACHE)
    res.status(200).send(JSON.stringify({ posts }))
  } catch (err) {
    const motivo = err?.name === 'TimeoutError' ? 'Behold tardó demasiado.' : 'No se pudo leer el feed.'
    fail(res, 502, motivo)
  }
}

/** Deja de cada publicación solo los campos que dibuja el sitio. */
function trim(post) {
  return {
    id: post?.id,
    permalink: post?.permalink,
    mediaType: post?.mediaType,
    thumbnailUrl: post?.thumbnailUrl,
    // La grilla usa `medium`; mandamos también `small` por si se cambia el diseño.
    sizes: {
      small: pick(post?.sizes?.small),
      medium: pick(post?.sizes?.medium),
    },
    prunedCaption: post?.prunedCaption ?? post?.caption ?? '',
    altText: post?.altText ?? null,
    colorPalette: post?.colorPalette?.dominant
      ? { dominant: post.colorPalette.dominant }
      : undefined,
    visibility: post?.visibility,
  }
}

function pick(size) {
  return size?.mediaUrl ? { mediaUrl: size.mediaUrl } : undefined
}

// Un error del proveedor no debe quedarse cacheado durante horas.
function fail(res, status, message) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).send(JSON.stringify({ error: message, posts: [] }))
}
