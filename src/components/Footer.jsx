import { Mail, MapPin, Globe } from 'lucide-react'

/* SVG inline icons for social brands (lucide doesn't include brand logos) */
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com/herin_oficial', label: 'Instagram' },
/*   { icon: Mail, href: 'mailto:hola@herin.co', label: 'Email' }, */
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-cream-light mb-4">
              HERIN
            </h3>
            <p className="font-body text-sm leading-relaxed mb-5 max-w-xs">
              Arte artesanal para tu hogar. Materas y velas hechas a mano con amor desde Zipaquirá, Colombia.
            </p>
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={14} className="text-terracotta" />
              <span>Zipaquirá, Cundinamarca</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-cream-light tracking-wide uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-3">
              {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-sm hover:text-terracotta transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold text-cream-light tracking-wide uppercase mb-4">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-cream/10 hover:bg-terracotta/80 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>{/* PENDIENTE AGREGAR CORREO */}
{/*             <p className="font-body text-xs text-cream/40">
              📧 hola@herin.co
            </p> */}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/30">
            © {year} Herin. Todos los derechos reservados.
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
