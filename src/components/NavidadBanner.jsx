import { MessageCircle, Clock } from 'lucide-react'
import SectionLink from './SectionLink'
import { useReveal } from '../hooks/useReveal'
import { navidad, diasPara, momentoVigente } from '../config/navidad'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

/**
 * Banda de la Colección Navidad, justo encima del catálogo.
 *
 * El tono se mantiene en la línea del sitio —crema, nada recargado— y la
 * Navidad entra solo por el dorado y una ramita de pino. Rojo y verde fuertes
 * romperían el diseño de galería y harían ver las fotos peor.
 *
 * El gancho es el Día de las Velitas: es lo que hace que una vela artesanal
 * sea urgente y no solo bonita.
 */
export default function NavidadBanner({ cantidad = 0 }) {
  const ref = useReveal()
  const momento = momentoVigente()
  const dias = momento ? diasPara(momento.cierrePedidos) : null

  return (
    <section
      ref={ref}
      aria-labelledby="navidad-titulo"
      className="reveal relative overflow-hidden bg-gradient-to-b from-cream via-cream-light to-paper border-y border-gold/25"
    >
      <RamaPino className="pointer-events-none absolute -top-6 -left-10 w-44 sm:w-60 text-moss/15 -rotate-12" />
      <RamaPino className="pointer-events-none absolute -bottom-8 -right-12 w-44 sm:w-60 text-moss/15 rotate-[160deg]" />
      <Copo className="pointer-events-none absolute top-10 right-[18%] w-5 text-gold/35 hidden sm:block" />
      <Copo className="pointer-events-none absolute bottom-12 left-[14%] w-4 text-gold/25 hidden sm:block" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center">
        <p className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.28em] uppercase text-gold-dark mb-5">
          <Estrella className="w-3.5" />
          {navidad.subtitulo}
          <Estrella className="w-3.5" />
        </p>

        <h2
          id="navidad-titulo"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal leading-[1.05] mb-5"
        >
          Colección
          <br />
          <span className="italic font-normal text-gold-dark">Navidad</span>
        </h2>

        <p className="font-body text-sm sm:text-base text-warm-gray leading-relaxed max-w-lg mx-auto mb-8">
          El <strong className="text-charcoal font-semibold">7 de diciembre</strong> Colombia
          entera prende velas. Las nuestras son moldeadas y pintadas a mano, una por
          una — y cada una llega lista para regalar.
        </p>

        {/* Cuenta regresiva: lo que convierte "bonito" en "pídela ya" */}
        {dias !== null && (
          <div className="inline-flex items-center gap-3 bg-paper/80 backdrop-blur-sm border border-gold/30 rounded-full pl-4 pr-5 py-2.5 mb-8">
            <Clock size={15} className="text-gold-dark shrink-0" />
            <p className="font-body text-xs sm:text-sm text-charcoal">
              {dias === 0 ? (
                <>Último día para pedir y recibir antes del {momento.titulo}</>
              ) : (
                <>
                  Quedan{' '}
                  <strong className="font-display text-lg sm:text-xl text-gold-dark align-middle px-0.5">
                    {dias}
                  </strong>{' '}
                  {dias === 1 ? 'día' : 'días'} para pedir y recibir antes del{' '}
                  {momento.titulo}
                </>
              )}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SectionLink
            id="productos"
            params={{ tag: 'navidad' }}
            className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/85 text-paper px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver la colección
            {cantidad > 0 && (
              <span className="font-normal text-paper/60">({cantidad})</span>
            )}
          </SectionLink>
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-charcoal/20 hover:border-charcoal/45 text-charcoal px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/[0.03]"
          >
            <MessageCircle size={16} />
            Encargar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* --- Adornos. Van inline: pesan nada y heredan el color del tema. --- */

function RamaPino({ className = '' }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" aria-hidden="true">
      <path d="M8 60h150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 20 + i * 16
        const largo = 34 - Math.abs(i - 4) * 3
        return (
          <g key={i} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d={`M${x} 60 L${x - 12} ${60 - largo}`} />
            <path d={`M${x} 60 L${x - 12} ${60 + largo}`} />
          </g>
        )
      })}
    </svg>
  )
}

function Copo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {[0, 60, 120].map((g) => (
          <g key={g} transform={`rotate(${g} 12 12)`}>
            <path d="M12 2v20" />
            <path d="M12 6l-3 3M12 6l3 3M12 18l-3-3M12 18l3-3" />
          </g>
        ))}
      </g>
    </svg>
  )
}

function Estrella({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 6.9L21.5 11l-6.1 3.4L13.9 22 12 16.2 10.1 22l-1.5-7.6L2.5 11l7.1-2.1z" />
    </svg>
  )
}
