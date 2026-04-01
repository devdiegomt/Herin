import { Hand, Leaf, Palette, Gift } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const benefits = [
  {
    icon: Hand,
    title: 'Hecho a mano',
    description: 'Cada pieza es moldeada, pintada y cuidada artesanalmente. No hay dos iguales.',
  },
  {
    icon: Leaf,
    title: 'Materiales naturales',
    description: 'Cemento, marmolina y cera de soja. Materiales nobles que respetan el entorno.',
  },
  {
    icon: Palette,
    title: 'Diseños únicos',
    description: 'Figuras originales, colores vibrantes y acabados que cuentan historias.',
  },
  {
    icon: Gift,
    title: 'Ideal para regalar',
    description: 'Piezas especiales para momentos especiales. Sorprende con arte artesanal.',
  },
]

export default function Benefits() {
  const ref = useReveal()

  return (
    <section className="py-20 sm:py-28 bg-cream-light noise-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div ref={ref} className="reveal text-center mb-14 sm:mb-18">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
            ¿Por qué Herin?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal">
            Lo que nos hace <span className="italic font-normal">especiales</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="animate-fade-up group text-center p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-moss/10 flex items-center justify-center group-hover:bg-moss/20 transition-colors duration-300">
                  <Icon className="text-moss" size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
