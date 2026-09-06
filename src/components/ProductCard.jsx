import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../utils/whatsapp'
import { formatPrice } from '../data/api'

/**
 * Tarjeta de catálogo. En móvil van dos por fila, así que la información se
 * reduce a lo esencial: foto, nombre y precio. La descripción aparece desde sm.
 *
 * @param {boolean} priority - las primeras tarjetas cargan su imagen de
 *   inmediato en vez de con lazy loading, para que el catálogo no aparezca
 *   vacío al llegar desde Instagram.
 */
export default function ProductCard({ product, priority = false }) {
  const { name, slug, description, price, image, tag, categoryLabel } = product
  const href = `/producto/${slug}`

  return (
    <article className="group flex flex-col">
      {/* El enlace de WhatsApp va como hermano del Link, no dentro:
          un <a> no puede contener otro <a>. */}
      <div className="relative">
        <Link
          to={href}
          className="block aspect-[4/5] overflow-hidden rounded-2xl bg-cream"
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-warm-gray/40 text-xs">
              Sin imagen
            </div>
          )}
        </Link>

        {tag && (
          <span className="pointer-events-none absolute top-3 left-3 bg-paper/90 backdrop-blur-sm text-charcoal text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wide">
            {tag}
          </span>
        )}

        {/* Consulta directa sin salir del catálogo */}
        <a
          href={getWhatsAppLink(name, formatPrice(price))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${name} por WhatsApp`}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-paper/90 backdrop-blur-sm text-moss flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-moss hover:text-paper md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <MessageCircle size={16} />
        </a>
      </div>

      <div className="pt-3 flex flex-col flex-1">
        <p className="font-body text-[10px] tracking-[0.18em] uppercase text-warm-gray/70 mb-1">
          {categoryLabel}
        </p>

        <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal leading-snug mb-1">
          <Link to={href} className="hover:text-terracotta transition-colors">
            {name}
          </Link>
        </h3>

        {description && (
          <p className="hidden sm:block font-body text-sm text-warm-gray leading-relaxed mb-2 line-clamp-2">
            {description}
          </p>
        )}

        <p className="font-body text-sm font-semibold text-charcoal mt-auto pt-1">
          {formatPrice(price)}
        </p>
      </div>
    </article>
  )
}
