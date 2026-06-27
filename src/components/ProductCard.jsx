import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../utils/whatsapp'
import { formatPrice } from '../data/api'

export default function ProductCard({ product }) {
  const { name, slug, description, price, image, tag, categorySlug, categoryLabel } = product

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Image (links to detail) */}
      <Link to={`/producto/${slug}`} className="block relative aspect-[4/5] overflow-hidden bg-sand/30">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray/40 text-sm">
            Sin imagen
          </div>
        )}

        {tag && (
          <span className="absolute top-4 left-4 bg-moss text-cream-light text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
            {tag}
          </span>
        )}

        <span className="absolute top-4 right-4 bg-white/85 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1.5 rounded-full capitalize tracking-wide">
          {categorySlug === 'materas' ? '🌱 ' : '🕯️ '}{categoryLabel || 'Producto'}
        </span>

        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-all duration-500" />
      </Link>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
            <Link to={`/producto/${slug}`} className="hover:text-terracotta transition-colors">
              {name}
            </Link>
          </h3>
          <span className="font-body text-sm font-semibold text-terracotta whitespace-nowrap mt-1">
            {formatPrice(price)}
          </span>
        </div>

        <p className="font-body text-sm text-warm-gray leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/producto/${slug}`}
            className="flex-1 flex items-center justify-center gap-2 border border-charcoal/20 hover:border-charcoal/40 text-charcoal py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/5"
          >
            Ver detalle
          </Link>
          <a
            href={getWhatsAppLink(name, formatPrice(price))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            className="flex items-center justify-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-4 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-moss/15"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </article>
  )
}
