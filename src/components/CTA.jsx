import { MessageCircle } from 'lucide-react'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'
import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const ref = useReveal()

  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/foto-gratis/flor-colorida-jardin_1373-544.jpg"
          alt="Ambiente cálido con decoración"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      {/* Content */}
      <div ref={ref} className="reveal relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-terracotta/20 flex items-center justify-center">
          <span className="font-display text-2xl">🌿</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream-light mb-5 leading-tight">
          ¿Listo para transformar
          <br />
          <span className="italic font-normal text-blush">tu espacio?</span>
        </h2>

        <p className="font-body text-cream/70 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Escríbenos por WhatsApp y te ayudamos a elegir la pieza perfecta para tu hogar o ese regalo especial.
        </p>

        <a
          href={getWhatsAppGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-10 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/25 hover:-translate-y-1"
        >
          <MessageCircle size={20} />
          Escríbenos por WhatsApp
        </a>

        <p className="mt-6 font-body text-xs text-cream/40 tracking-wide">
          Respuesta rápida · Envíos a toda Colombia
        </p>
      </div>
    </section>
  )
}
