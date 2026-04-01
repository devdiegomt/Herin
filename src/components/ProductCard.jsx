import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../utils/whatsapp'

export default function ProductCard({ product }) {
  const { name, description, price, image, tag, category } = product

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag badge */}
        {tag && (
          <span className="absolute top-4 left-4 bg-moss text-cream-light text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
            {tag}
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-4 right-4 bg-white/85 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1.5 rounded-full capitalize tracking-wide">
          {category === 'materas' ? '🌱 Matera' : '🕯️ Vela'}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
            {name}
          </h3>
          <span className="font-body text-sm font-semibold text-terracotta whitespace-nowrap mt-1">
            ${price}
          </span>
        </div>

        <p className="font-body text-sm text-warm-gray leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* WhatsApp CTA */}
        <a
          href={getWhatsAppLink(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-moss hover:bg-moss-light text-cream-light py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-moss/15"
        >
          <MessageCircle size={16} />
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}
