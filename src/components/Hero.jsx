import { MessageCircle, MapPin, Hand, Clock } from 'lucide-react'
import SectionLink from './SectionLink'
import { store } from '../config/site'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

/**
 * Hero compacto. El catálogo tiene que quedar a un scroll corto: quien llega
 * desde Instagram ya vio una foto y viene a ver el resto, no a leer.
 */
const strip = [
  { src: '/images/products/flowerpots/matera7.webp', alt: 'Matera elefante artesanal' },
  { src: '/images/products/candles/vela1.webp', alt: 'Vela de soja pintada a mano' },
  { src: '/images/products/flowerpots/matera3.webp', alt: 'Matera de cemento con suculenta' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-paper overflow-hidden">
      {/* Halos muy tenues: dan profundidad sin ensuciar el fondo */}
      <div className="pointer-events-none absolute -top-32 -left-40 w-96 h-96 rounded-full bg-sand/40 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 -right-32 w-80 h-80 rounded-full bg-blush/15 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-10 sm:pb-14 text-center">
        <p className="animate-fade-up font-body text-[11px] sm:text-xs tracking-[0.3em] uppercase text-terracotta mb-5">
          Artesanía · Naturaleza · Hogar
        </p>

        <h1 className="animate-fade-up animation-delay-100 font-display text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.08] mb-5">
          Arte que da vida
          <br />
          <span className="italic font-normal text-terracotta">a tus espacios</span>
        </h1>

        <p className="animate-fade-up animation-delay-200 font-body text-sm sm:text-base text-warm-gray max-w-md sm:max-w-lg mx-auto mb-8 leading-relaxed">
          Materas y velas hechas a mano en {store.address.split(',')[1]?.trim() || 'Zipaquirá'}.
          Cada pieza es única.
        </p>

        {/*
          Tres acciones al mismo nivel. En móvil el catálogo va completo arriba
          y las otras dos comparten fila, para no empujar el catálogo hacia
          abajo con tres botones apilados.
        */}
        <div className="animate-fade-up animation-delay-300 mb-7">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
            <SectionLink
              id="productos"
              className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/85 text-paper px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver el catálogo
            </SectionLink>

            <div className="flex gap-3 sm:contents">
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap border border-charcoal/20 hover:border-charcoal/45 text-charcoal px-3 sm:px-8 py-3.5 rounded-full text-[13px] sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/[0.03]"
              >
                <MessageCircle size={16} />
                Escríbenos
              </a>
              <SectionLink
                id="ubicacion"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap border border-charcoal/20 hover:border-charcoal/45 text-charcoal px-3 sm:px-8 py-3.5 rounded-full text-[13px] sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/[0.03]"
              >
                <MapPin size={16} />
                Dónde estamos
              </SectionLink>
            </div>
          </div>
        </div>

        {/* Señales de confianza, en una línea */}
        <ul className="animate-fade-up animation-delay-400 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-[11px] sm:text-xs text-warm-gray">
          <li className="inline-flex items-center gap-1.5">
            <Hand size={13} className="text-terracotta" />
            Hecho a mano, pieza por pieza
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-terracotta" />
            {store.schedule}
          </li>
        </ul>
      </div>

      {/* Tira de piezas: adelanta el catálogo antes del scroll */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {strip.map((img, i) => (
            <div
              key={img.src}
              className="animate-fade-up overflow-hidden rounded-t-2xl bg-cream aspect-[3/4]"
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                width={432}
                height={576}
                fetchPriority={i === 0 ? 'high' : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
