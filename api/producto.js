/**
 * Función serverless que sirve /producto/:slug con las etiquetas correctas
 * de Open Graph ya puestas en el HTML.
 *
 * POR QUÉ EXISTE
 * El sitio se renderiza en el cliente. WhatsApp, Instagram y Facebook NO
 * ejecutan JavaScript: leen el HTML crudo y se quedan con lo que encuentren.
 * Sin esto, compartir el link de una vela mostraba siempre la imagen genérica
 * del sitio. Esta función toma el mismo index.html, le cambia el título, la
 * descripción y la imagen por los del producto, y lo devuelve.
 *
 * El contenido que ve la persona es exactamente el mismo: React arranca igual
 * y reemplaza estas etiquetas por las suyas (ver src/components/Seo.jsx).
 * No hay una versión para bots y otra para humanos.
 *
 * ENRUTADO
 * vercel.json manda /producto/:slug aquí pasando el slug por query.
 *
 * CACHÉ
 * La respuesta se cachea en el CDN de Vercel, así que la función solo corre
 * de verdad cada pocos minutos por producto, no en cada visita.
 *
 * SI ALGO FALLA
 * Nunca rompe la página: si Supabase no responde o el producto no existe,
 * devuelve el index.html tal cual y la app se encarga desde el cliente.
 */

const CACHE = 'public, s-maxage=300, stale-while-revalidate=86400'

/**
 * Marcador que comparten estas etiquetas con las de index.html.
 *
 * Cuando React monta en el navegador, Seo.jsx borra del <head> todo lo que lo
 * lleve y pone sus propias etiquetas. Sin el marcador quedarían las dos: la que
 * inyectamos aquí y la de React, o sea dos canonical y dos og:image otra vez.
 */
const MARK = 'data-static-seo'

export default async function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const origin = `${proto}://${host}`

  let html
  try {
    html = await fetchShell(origin)
  } catch {
    // Sin el HTML base no hay nada que hacer; que Vercel sirva el estático.
    res.status(500).send('No se pudo cargar la página.')
    return
  }

  const slug = getSlug(req)
  if (!slug) {
    send(res, html, 200)
    return
  }

  let product = null
  try {
    product = await fetchProduct(slug)
  } catch {
    // No pudimos consultar (Supabase caído, variables mal puestas). NO es lo
    // mismo que "no existe": si respondiéramos 404, una caída pasajera haría
    // que Google desindexara todos los productos. Servimos el shell genérico
    // con 200 y que el cliente lo resuelva.
    sendUncached(res, html, 200)
    return
  }

  if (!product) {
    // Aquí sí sabemos que el producto no existe o está oculto: 404 y noindex,
    // para no dejar en Google URLs de piezas que ya no están.
    send(res, injectTags(html, [tag('meta', { name: 'robots', content: 'noindex' })]), 404)
    return
  }

  const url = `${origin}/producto/${product.slug}`
  const title = `${product.name} — Herin`
  const description =
    product.description ||
    product.description_long ||
    `${product.name} — pieza artesanal de Herin, hecha a mano en Zipaquirá.`
  const image = primaryImage(product) || `${origin}/images/og-herin.jpg`

  const tags = [
    `<title ${MARK}>${escapeHtml(title)}</title>`,
    tag('meta', { name: 'description', content: description }),
    tag('link', { rel: 'canonical', href: url }),

    tag('meta', { property: 'og:site_name', content: 'Herin' }),
    tag('meta', { property: 'og:type', content: 'product' }),
    tag('meta', { property: 'og:title', content: title }),
    tag('meta', { property: 'og:description', content: description }),
    tag('meta', { property: 'og:url', content: url }),
    tag('meta', { property: 'og:image', content: image }),
    tag('meta', { property: 'og:image:alt', content: product.name }),
    tag('meta', { property: 'og:locale', content: 'es_CO' }),

    tag('meta', { name: 'twitter:card', content: 'summary_large_image' }),
    tag('meta', { name: 'twitter:title', content: title }),
    tag('meta', { name: 'twitter:description', content: description }),
    tag('meta', { name: 'twitter:image', content: image }),

    jsonLd(product, url),
  ]

  send(res, injectTags(html, tags), 200)
}

// =====================================================================
// Lógica pura (exportada para poder probarla sin desplegar)
// =====================================================================

/**
 * Quita las etiquetas marcadas con data-static-seo en index.html y pone las
 * nuevas antes de </head>. Reemplazamos el bloque entero en vez de parchear
 * etiqueta por etiqueta: así nunca quedan dos canonical ni dos og:image.
 */
export function injectTags(html, tags) {
  const cleaned = html
    .replace(/<title\b[^>]*\bdata-static-seo\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script\b[^>]*\bdata-static-seo\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<(?:meta|link)\b[^>]*\bdata-static-seo\b[^>]*?\/?>/gi, '')

  const block = tags.join('\n    ')
  return cleaned.includes('</head>')
    ? cleaned.replace('</head>', `    ${block}\n  </head>`)
    : cleaned + block
}

/** Construye una etiqueta escapando SIEMPRE los valores. */
export function tag(name, attrs) {
  const parts = Object.entries(attrs)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${k}="${escapeHtml(String(v))}"`)
  return `<${name} ${MARK} ${parts.join(' ')} />`
}

/**
 * Escapa para uso dentro de atributos HTML. Los textos vienen del panel de
 * administración, pero se escapan igual: un nombre con comillas rompería el
 * atributo aunque nadie tenga mala intención.
 */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Datos estructurados para Google (precio, moneda, disponibilidad). */
export function jsonLd(product, url) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description_long || product.description || product.name,
    image: (product.product_images ?? []).map((i) => i.url),
    brand: { '@type': 'Brand', name: 'Herin' },
    url,
    offers: {
      '@type': 'Offer',
      price: Number(product.price ?? 0),
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
      url,
    },
  }
  // Cerrar </script> dentro del JSON rompería el bloque: lo neutralizamos.
  const json = JSON.stringify(data).replace(/<\//g, '<\\/')
  return `<script ${MARK} type="application/ld+json">${json}</script>`
}

/** La foto marcada como principal; si no hay, la primera. */
export function primaryImage(product) {
  const images = product.product_images ?? []
  if (!images.length) return null
  const primary = images.find((i) => i.is_primary)
  return (primary ?? images[0]).url ?? null
}

/** El slug llega por query desde el rewrite; el path es el respaldo. */
export function getSlug(req) {
  const fromQuery = req.query?.slug
  if (fromQuery) return String(fromQuery)

  const path = (req.url || '').split('?')[0]
  const match = path.match(/\/producto\/([^/]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// =====================================================================
// Datos y red
// =====================================================================

async function fetchShell(origin) {
  // index.html es un archivo estático: Vercel lo sirve antes de aplicar los
  // rewrites, así que esto no se llama a sí mismo.
  const res = await fetch(`${origin}/index.html`)
  if (!res.ok) throw new Error(`shell HTTP ${res.status}`)
  return res.text()
}

async function fetchProduct(slug) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) throw new Error('Faltan las variables de Supabase')

  const query =
    `${url}/rest/v1/products` +
    `?slug=eq.${encodeURIComponent(slug)}` +
    `&active=is.true` +
    `&select=slug,name,description,description_long,price,product_images(url,is_primary,sort_order)` +
    `&limit=1`

  const res = await fetch(query, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!res.ok) throw new Error(`supabase HTTP ${res.status}`)

  const rows = await res.json()
  return Array.isArray(rows) && rows.length ? rows[0] : null
}

function send(res, html, status) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', CACHE)
  res.status(status).send(html)
}

// Para respuestas degradadas: no queremos que el CDN guarde durante horas una
// página sin sus etiquetas por culpa de una caída de un minuto.
function sendUncached(res, html, status) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).send(html)
}
