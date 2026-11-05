/**
 * Sirve /navidad con la tarjeta de Navidad ya puesta en el HTML.
 *
 * POR QUÉ EXISTE
 * WhatsApp e Instagram no ejecutan JavaScript: al compartir un link leen el
 * HTML crudo. Por eso `/?tag=navidad` mostraba la tarjeta genérica del sitio,
 * sin una palabra de Navidad — justo lo contrario de lo que se quiere al
 * pegarlo en un estado.
 *
 * Esta función devuelve el mismo index.html con el título, la descripción y la
 * imagen de la colección. La persona aterriza en el catálogo ya filtrado
 * gracias al ancla #productos y al parámetro ?tag=navidad.
 *
 * Es además el link corto para dictar o poner en la bio:
 *     herinoficial.vercel.app/navidad
 */

const CACHE = 'public, s-maxage=3600, stale-while-revalidate=86400'
const MARK = 'data-static-seo'

export default async function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const origin = `${proto}://${host}`

  let html
  try {
    html = await fetchShell(origin)
  } catch {
    // Sin el HTML base no hay nada que servir: que el visitante caiga en el
    // catálogo normal en vez de ver un error.
    res.setHeader('Location', '/?tag=navidad#productos')
    res.status(302).end()
    return
  }

  const url = `${origin}/navidad`
  const titulo = 'Colección Navidad — Herin'
  const descripcion =
    'Velas artesanales para el Día de las Velitas. Hechas y pintadas a mano, ' +
    'una por una, en Zipaquirá. Mira la colección y encarga por WhatsApp.'
  const imagen = `${origin}/images/og-navidad.jpg`

  const etiquetas = [
    `<title ${MARK}>${escapar(titulo)}</title>`,
    tag('meta', { name: 'description', content: descripcion }),
    tag('link', { rel: 'canonical', href: url }),

    tag('meta', { property: 'og:site_name', content: 'Herin' }),
    tag('meta', { property: 'og:type', content: 'website' }),
    tag('meta', { property: 'og:title', content: titulo }),
    tag('meta', { property: 'og:description', content: descripcion }),
    tag('meta', { property: 'og:url', content: url }),
    tag('meta', { property: 'og:image', content: imagen }),
    tag('meta', { property: 'og:image:width', content: '1200' }),
    tag('meta', { property: 'og:image:height', content: '630' }),
    tag('meta', { property: 'og:image:alt', content: 'Colección Navidad de Herin' }),
    tag('meta', { property: 'og:locale', content: 'es_CO' }),

    tag('meta', { name: 'twitter:card', content: 'summary_large_image' }),
    tag('meta', { name: 'twitter:title', content: titulo }),
    tag('meta', { name: 'twitter:description', content: descripcion }),
    tag('meta', { name: 'twitter:image', content: imagen }),

    // Deja el catálogo filtrado sin que el visitante tenga que tocar nada.
    // Va en el HTML y no como redirección del servidor para que el bot de
    // WhatsApp alcance a leer las etiquetas de arriba.
    //
    // Conserva los parámetros que ya vengan (utm_source y demás): si los
    // borráramos, la analítica no sabría de dónde llegó la visita, que es
    // justo para lo que se reparte este link.
    `<script>(function(){var p=new URLSearchParams(location.search);` +
      `if(p.get('tag')==='navidad')return;p.set('tag','navidad');` +
      `history.replaceState(null,'','/?'+p+'#productos')})()</script>`,
  ]

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', CACHE)
  res.status(200).send(inyectar(html, etiquetas))
}

/** Quita las etiquetas marcadas del shell y pone las nuestras antes de </head>. */
function inyectar(html, etiquetas) {
  const limpio = html
    .replace(/<title\b[^>]*\bdata-static-seo\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script\b[^>]*\bdata-static-seo\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<(?:meta|link)\b[^>]*\bdata-static-seo\b[^>]*?\/?>/gi, '')

  const bloque = etiquetas.join('\n    ')
  return limpio.includes('</head>')
    ? limpio.replace('</head>', `    ${bloque}\n  </head>`)
    : limpio + bloque
}

function tag(nombre, attrs) {
  const partes = Object.entries(attrs)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${k}="${escapar(String(v))}"`)
  return `<${nombre} ${MARK} ${partes.join(' ')} />`
}

function escapar(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function fetchShell(origin) {
  // index.html es estático: Vercel lo sirve antes de aplicar los rewrites,
  // así que esto no se llama a sí mismo.
  const res = await fetch(`${origin}/index.html`)
  if (!res.ok) throw new Error(`shell HTTP ${res.status}`)
  return res.text()
}
