import { MapPin, Clock, MessageCircle, Store } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'
import { store, mapEmbedSrc, directionsLink } from '../config/site'

export default function PuntoFisico() {
  const refText = useReveal()
  const refMap = useReveal()

  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-cream/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Info */}
          <div ref={refText} className="reveal">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
              Visítanos
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6 leading-tight">
              Encuentra Herin
              <br />
              <span className="italic font-normal">en Zipaquirá</span>
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mb-10 max-w-md">
              Nuestras piezas están disponibles en un punto físico donde puedes tocarlas,
              olerlas y elegir la que más te enamore.
            </p>

            {/* Info blocks */}
            <div className="space-y-6 mb-10">
              <InfoRow icon={Store} label="Punto de venta">
                {store.name}
              </InfoRow>
              <InfoRow icon={MapPin} label="Dirección">
                {store.address}
              </InfoRow>
              <InfoRow icon={Clock} label="Horario">
                {store.schedule}
              </InfoRow>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-moss/20 hover:-translate-y-0.5"
              >
                <MapPin size={16} />
                Cómo llegar
              </a>
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-charcoal/25 hover:border-terracotta hover:text-terracotta text-charcoal px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
              >
                <MessageCircle size={16} />
                Escríbenos primero
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            ref={refMap}
            className="reveal relative rounded-3xl overflow-hidden shadow-lg aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
          >
            <iframe
              title={`Ubicación Herin — ${store.name}`}
              src={mapEmbedSrc}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Small overlay accent */}
            <div className="pointer-events-none absolute bottom-4 left-4 bg-cream-light/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              <span className="font-body text-xs font-medium text-charcoal">
                {store.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-cream-light border border-sand flex items-center justify-center shrink-0">
        <Icon className="text-terracotta" size={18} />
      </div>
      <div>
        <p className="font-body text-xs tracking-widest uppercase text-warm-gray mb-1">
          {label}
        </p>
        <p className="font-display text-lg text-charcoal leading-snug">{children}</p>
      </div>
    </div>
  )
}