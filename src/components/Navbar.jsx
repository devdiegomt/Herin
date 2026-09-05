import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import SectionLink from './SectionLink'
import { sections } from '../config/site'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setIsOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream-light/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-charcoal hover:text-terracotta transition-colors"
          >
            HERIN
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <SectionLink
                key={s.id}
                id={s.id}
                className="font-body text-sm font-medium tracking-wide text-warm-gray hover:text-terracotta transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-terracotta after:transition-all after:duration-300 hover:after:w-full"
              >
                {s.label}
              </SectionLink>
            ))}
            <a
              href={getWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors"
            >
              <MessageCircle size={16} />
              Escríbenos
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream-light/98 backdrop-blur-lg border-t border-sand/50 px-5 py-4 space-y-1">
          {sections.map((s) => (
            <SectionLink
              key={s.id}
              id={s.id}
              onNavigate={close}
              className="block py-3 px-3 text-sm font-medium text-warm-gray hover:text-terracotta hover:bg-sand/30 rounded-lg transition-all"
            >
              {s.label}
            </SectionLink>
          ))}
          <a
            href={getWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center gap-2 mt-2 py-3 px-3 text-sm font-medium text-moss hover:bg-sand/30 rounded-lg transition-all"
          >
            <MessageCircle size={16} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
