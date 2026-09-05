import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Link a una sección del home que funciona desde cualquier ruta.
 * En "/" hace scroll suave; desde otra ruta navega a "/#seccion" sin recargar
 * y ScrollToHash se encarga del scroll cuando la sección ya montó.
 */
export default function SectionLink({ id, children, onNavigate, ...props }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    // Deja pasar clic con modificador / botón central: abrir en pestaña nueva.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.()

    if (pathname !== '/') {
      navigate(`/#${id}`)
      return
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    // Mantiene la URL compartible sin re-disparar ScrollToHash
    window.history.replaceState(null, '', `/#${id}`)
  }

  return (
    <a href={`/#${id}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
