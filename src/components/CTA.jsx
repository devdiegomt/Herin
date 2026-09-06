import { MessageCircle, MapPin } from 'lucide-react'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'
import { useReveal } from '../hooks/useReveal'
import SectionLink from './SectionLink'
import { store } from '../config/site'

/**
 * Cierre de la página. Antes tenía una foto de fondo (images/soft.jpg) de
 * 183x275 px estirada a pantalla completa: se veía pixelada. Sin una foto de
 * ambiente en buena resolución, un bloque de color limpio se ve mejor.
 */
export default function CTA() {
  const ref = useReveal()

  return (
    <section id="contacto" className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
      {/* Halos suaves: dan profundidad sin necesitar una foto */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-moss/20 blur-3xl" />

      <div
        ref={ref}
        className="reveal relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center"
      >
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-blush mb-5">
          Hablemos
        </p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-5 leading-tight">
          ¿Listo para transformar
          <br />
          <span className="italic font-normal text-blush">tu espacio?</span>
        </h2>

        <p className="font-body text-cream/70 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Escríbenos por WhatsApp y te ayudamos a elegir la pieza perfecta para tu
          hogar o ese regalo especial. También puedes venir a verlas en persona.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-moss hover:bg-moss-light text-paper px-8 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            Escríbenos por WhatsApp
          </a>
          <SectionLink
            id="ubicacion"
            className="inline-flex items-center justify-center gap-2 border border-cream/25 hover:border-cream/50 text-paper px-8 py-4 rounded-full text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/5"
          >
            <MapPin size={18} />
            Dónde estamos
          </SectionLink>
        </div>

        <p className="mt-6 font-body text-xs text-cream/45 tracking-wide">
          Respuesta rápida · {store.schedule}
        </p>
      </div>
    </section>
  )
}
