import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=1000&fit=crop&crop=center"
          alt="Espacio cálido con plantas y velas"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/35 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-20">
        {/* Tagline */}
        <p className="animate-fade-up font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-sand/90 mb-6">
          Artesanía · Naturaleza · Hogar
        </p>

        {/* Main heading */}
        <h1 className="animate-fade-up animation-delay-100 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-cream-light leading-[1.1] mb-6 sm:mb-8">
          Arte que da vida
          <br />
          <span className="italic font-normal text-blush">a tus espacios</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up animation-delay-200 font-body text-base sm:text-lg text-cream/80 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          Materas y velas artesanales hechas a mano con amor.
          <br className="hidden sm:block" />
          Cada pieza es única, como tu hogar.
        </p>

        {/* CTA */}
        <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#productos"
            className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/20 hover:-translate-y-0.5"
          >
            Ver catálogo
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center justify-center gap-2 border border-cream-light/40 hover:border-cream-light/70 text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-cream-light/10"
          >
            Conoce Herin
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#productos" aria-label="Ir al catálogo">
          <ArrowDown className="text-cream-light/60" size={20} />
        </a>
      </div>
    </section>
  )
}
