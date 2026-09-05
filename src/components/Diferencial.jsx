import { Fingerprint, Sparkles, Heart } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    icon: Fingerprint,
    title: 'Ninguna se repite',
    description:
      'Cada pieza tiene su propio veteado, textura y carácter. Como una huella digital.',
  },
  {
    icon: Sparkles,
    title: 'Detalles pintados a mano',
    description:
      'Nada sale de un molde industrial. Cada acabado lleva pincel y tiempo humano.',
  },
  {
    icon: Heart,
    title: 'Hecho con calma',
    description:
      'Producciones pequeñas, sin prisa. Cuidamos el proceso para que la pieza dure años.',
  },
]

export default function Diferencial() {
  const refHeader = useReveal()

  return (
    <section id="diferencial" className="relative py-20 sm:py-28 bg-moss text-cream-light overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute top-16 -left-24 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blush/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Statement */}
        <div ref={refHeader} className="reveal max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-blush mb-5">
            Nuestra promesa
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-6">
            Cada pieza es única y hecha
            <br />
            <span className="italic text-blush">completamente a mano</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-cream/75 leading-relaxed max-w-xl mx-auto">
            No encontrarás dos iguales en ningún otro lugar. Ese es el sello Herin: piezas
            irrepetibles nacidas de manos que las moldean con oficio y con calma.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarCard({ pillar, index }) {
  const ref = useReveal()
  const Icon = pillar.icon
  return (
    <div
      ref={ref}
      className="reveal text-center sm:text-left"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="w-14 h-14 mx-auto sm:mx-0 mb-5 rounded-2xl bg-cream-light/10 flex items-center justify-center">
        <Icon className="text-blush" size={24} />
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3">
        {pillar.title}
      </h3>
      <p className="font-body text-sm text-cream/70 leading-relaxed">
        {pillar.description}
      </p>
    </div>
  )
}