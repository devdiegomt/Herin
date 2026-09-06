import { useLocation } from 'react-router-dom'
import { MessageCircle, LayoutGrid } from 'lucide-react'
import SectionLink from './SectionLink'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

/**
 * Barra de acciones fija en móvil. Reemplaza al botón flotante: ocupa el mismo
 * espacio pero ofrece las dos cosas que la persona necesita en todo momento —
 * volver al catálogo y escribir por WhatsApp.
 *
 * El alto lo reserva el `padding-bottom` del body (ver index.css).
 */
export default function MobileBar() {
  const { pathname } = useLocation()
  const isDetail = pathname.startsWith('/producto/')

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-2 px-4 py-3">
        <SectionLink
          id="productos"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-line text-charcoal py-3 rounded-full text-sm font-medium tracking-wide transition-colors hover:bg-cream"
        >
          <LayoutGrid size={16} />
          {isDetail ? 'Volver al catálogo' : 'Ver catálogo'}
        </SectionLink>

        <a
          href={getWhatsAppGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-moss text-paper py-3 rounded-full text-sm font-semibold tracking-wide transition-colors hover:bg-moss-light"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
