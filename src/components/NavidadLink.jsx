import SectionLink from './SectionLink'
import { enTemporada } from '../config/navidad'

/**
 * Enlace a la Colección Navidad para la barra de navegación.
 *
 * Es el único elemento dorado y relleno del menú: en temporada, la colección
 * es la prioridad y tiene que ganarle la mirada a los demás enlaces, que son
 * texto plano. Desaparece solo al terminar la temporada (ver config/navidad.js).
 *
 * Lleva a `#productos` con el filtro puesto, igual que la banda del catálogo,
 * para que no haya dos maneras distintas de llegar a lo mismo.
 */
export default function NavidadLink({ variante = 'escritorio', onNavigate }) {
  if (!enTemporada(window.location.search)) return null

  const esMovil = variante === 'movil'

  return (
    <SectionLink
      id="productos"
      params={{ tag: 'navidad' }}
      onNavigate={onNavigate}
      aria-label="Ver la Colección Navidad"
      className={
        esMovil
          ? 'flex items-center gap-2 py-3 px-3 rounded-lg bg-gold-dark text-paper text-sm font-semibold tracking-wide transition-colors hover:bg-gold'
          : 'inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-gold-dark hover:bg-gold text-paper px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors shadow-sm shadow-gold/25'
      }
    >
      <Estrella className="w-3.5 h-3.5 shrink-0" />
      Navidad
    </SectionLink>
  )
}

function Estrella({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 6.9L21.5 11l-6.1 3.4L13.9 22 12 16.2 10.1 22l-1.5-7.6L2.5 11l7.1-2.1z" />
    </svg>
  )
}
