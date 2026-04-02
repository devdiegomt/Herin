import { ArrowDown } from 'lucide-react'
import HeroBg from './HeroBg'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* SVG illustrated background */}
      <div className="absolute inset-0">
        <HeroBg />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-20">
        {/* Tagline */}
        <p className="animate-fade-up font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-terracotta mb-6">
          Artesanía · Naturaleza · Hogar
        </p>

        {/* Main heading */}
        <h1 className="animate-fade-up animation-delay-100 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-charcoal leading-[1.1] mb-6 sm:mb-8">
          Arte que da vida
          <br />
          <span className="italic font-normal text-terracotta">a tus espacios</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up animation-delay-200 font-body text-base sm:text-lg text-warm-gray max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          Materas y velas artesanales hechas a mano con amor.
          <br className="hidden sm:block" />
          Cada pieza es única, como tu hogar.
        </p>

        {/* CTA */}
        <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#productos"
            className="inline-flex items-center justify-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-moss/20 hover:-translate-y-0.5"
          >
            Ver catálogo
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center justify-center gap-2 border border-charcoal/25 hover:border-charcoal/50 text-charcoal px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/5"
          >
            Conoce Herin
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#productos" aria-label="Ir al catálogo">
          <ArrowDown className="text-warm-gray/60" size={20} />
        </a>
      </div>
    </section>
  )
}
