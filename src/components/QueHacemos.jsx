import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const categories = [
  {
    title: 'Materas',
    subtitle: 'Cemento & marmolina',
    description:
      'Moldeadas y curadas a mano. Cada matera tiene una textura irrepetible: veteados, acabados mate y colores tierra que se integran a cualquier espacio.',
    image: '/images/products/flowerpots/matera1.webp',
    anchor: '#productos',
  },
  {
    title: 'Velas',
    subtitle: 'Cera de soja natural',
    description:
      'Aromas seleccionados y figuras pintadas a mano. Encienden un ambiente cálido y duran horas gracias a la cera vegetal de combustión limpia.',
    image: '/images/products/candles/vela1.webp',
    anchor: '#productos',
  },
]

export default function QueHacemos() {
  const refHeader = useReveal()

  return (
    <section id="que-hacemos" className="py-20 sm:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div ref={refHeader} className="reveal text-center mb-14 sm:mb-18 max-w-2xl mx-auto">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
            Qué hacemos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal leading-tight">
            Dos oficios,
            <br />
            <span className="italic font-normal">una misma alma artesanal</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat, index }) {
  const ref = useReveal()
  return (
    <a
      href={cat.anchor}
      ref={ref}
      className="reveal group relative overflow-hidden rounded-3xl bg-sand/40 hover:shadow-xl transition-all duration-500"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="aspect-[4/5] sm:aspect-[5/6] overflow-hidden">
        <img
          src={cat.image}
          alt={`${cat.title} artesanales Herin`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-cream-light">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-blush/90 mb-2">
          {cat.subtitle}
        </p>
        <div className="flex items-end justify-between gap-4 mb-3">
          <h3 className="font-display text-3xl sm:text-4xl font-semibold leading-none">
            {cat.title}
          </h3>
          <span className="w-11 h-11 rounded-full bg-cream-light/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-terracotta group-hover:rotate-45 transition-all duration-500 shrink-0">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="font-body text-sm text-cream/85 leading-relaxed max-w-md">
          {cat.description}
        </p>
      </div>
    </a>
  )
}