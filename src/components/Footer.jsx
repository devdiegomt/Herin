import { Link } from 'react-router-dom'
import { MapPin, Clock, MessageCircle } from 'lucide-react'
import SectionLink from './SectionLink'
import InstagramIcon from './icons/InstagramIcon'
import { site, store, contact, sections, instagramUrl } from '../config/site'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Marca */}
          <div>
            <Link
              to="/"
              className="inline-block font-display text-2xl font-semibold text-cream-light mb-4"
            >
              HERIN
            </Link>
            <p className="font-body text-sm leading-relaxed mb-5 max-w-xs">
              Arte artesanal para tu hogar. Materas y velas hechas a mano con amor
              desde {site.city.split(',')[0]}, Colombia.
            </p>
            <a
              href={store.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-terracotta transition-colors"
            >
              <MapPin size={14} className="text-terracotta shrink-0" />
              <span>{site.city}</span>
            </a>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-body text-sm font-semibold text-cream-light tracking-wide uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <SectionLink
                    id={s.id}
                    className="font-body text-sm hover:text-terracotta transition-colors"
                  >
                    {s.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-body text-sm font-semibold text-cream-light tracking-wide uppercase mb-4">
              Contacto
            </h4>

            <a
              href={getWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors mb-5"
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>

            <p className="flex items-start gap-2 font-body text-sm mb-2">
              <Clock size={14} className="text-terracotta shrink-0 mt-0.5" />
              <span>{store.schedule}</span>
            </p>
            <p className="font-body text-sm mb-5">
              {store.name} · {store.address}
            </p>

            <div className="flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${site.name}`}
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-terracotta/80 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <InstagramIcon size={18} />
              </a>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Enviar correo"
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-terracotta/80 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  ✉
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/30">
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <a
            href="https://fulcrotech.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-cream/30 hover:text-terracotta transition-colors"
          >
            by Fulcro
          </a>
        </div>
      </div>
    </footer>
  )
}
