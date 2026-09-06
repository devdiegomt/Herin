import { useEffect } from 'react'
import { site } from '../config/site'

/**
 * React 19 AÑADE al <head> las etiquetas que renderizamos, pero no reemplaza
 * las que ya venían en index.html. Sin esto quedarían dos <link canonical> y
 * dos og:image, que es peor que no tener ninguno.
 *
 * Las estáticas siguen siendo necesarias en el HTML (son las únicas que ven
 * WhatsApp e Instagram, que no ejecutan JS), así que las retiramos recién
 * cuando React ya montó las suyas.
 */
function useReplaceStaticTags() {
  useEffect(() => {
    document
      .querySelectorAll('head [data-static-seo]')
      .forEach((el) => el.remove())
  }, [])
}

/**
 * Metadatos de la página. React 19 sube automáticamente al <head> las etiquetas
 * <title>, <meta> y <link rel="canonical"> que se rendericen aquí.
 *
 * OJO: el sitio es 100% cliente, así que estas etiquetas solo existen después
 * de que corre el JS. Google las ve (renderiza JS), pero los previsualizadores
 * de WhatsApp / Instagram / Facebook NO: ellos leen el HTML crudo y por eso
 * usan las etiquetas estáticas de index.html. Para que compartir un producto
 * concreto muestre su foto hace falta inyectarlas en el servidor.
 */
export default function Seo({ title, description, image, path = '', type = 'website' }) {
  useReplaceStaticTags()

  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  const url = `${site.url}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  )
}

/**
 * Datos estructurados de producto (schema.org). Ayuda a que Google muestre
 * precio y disponibilidad en los resultados de búsqueda.
 */
export function ProductJsonLd({ product, url }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.descriptionLong || product.description,
    image: product.images?.length ? product.images : undefined,
    brand: { '@type': 'Brand', name: site.name },
    url,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
      url,
    },
  }

  return (
    <script
      type="application/ld+json"
      // El contenido lo generamos nosotros a partir de la base, no del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
