import { ArrowDown, MessageCircle, MapPin } from 'lucide-react'
import HeroBg from './HeroBg'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

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

        {/* CTAs */}
        <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </a>
          <a
            href="#ubicacion"
            className="inline-flex items-center justify-center gap-2 border border-charcoal/25 hover:border-charcoal/50 text-charcoal px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/5"
          >
            <MapPin size={16} />
            Visítanos en Zipaquirá
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#que-hacemos" aria-label="Ir a Qué hacemos">
          <ArrowDown className="text-warm-gray/60" size={20} />
        </a>
      </div>
    </section>
  )
}