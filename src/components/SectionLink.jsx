import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Link a una sección del home que funciona desde cualquier ruta.
 *
 * `params` (opcional) son parámetros de búsqueda que se aplican al llegar; por
 * ejemplo `params={{ cat: 'velas' }}` filtra el catálogo por velas.
 *
 * El scroll lo hace este componente, no ScrollToHash. ScrollToHash solo
 * reacciona cuando cambia el hash, y al pasar de "Velas" a "Materas" el hash
 * sigue siendo #productos: sin esto, el segundo clic cambiaba el filtro pero
 * dejaba a la persona donde estaba.
 */
export default function SectionLink({ id, params, children, onNavigate, ...props }) {
  const { pathname, search: currentSearch } = useLocation()
  const navigate = useNavigate()

  // Sin `params` el enlace solo lleva a la sección: conserva el filtro que la
  // persona ya tenía puesto. Si lo borráramos, la URL diría "sin filtro"
  // mientras el catálogo sigue mostrando una categoría, y compartir ese enlace
  // le enseñaría otra cosa a quien lo abra.
  const search = params
    ? `?${new URLSearchParams(params)}`
    : pathname === '/'
      ? currentSearch
      : ''

  const href = `/${search}#${id}`

  const handleClick = (e) => {
    // Deja pasar clic con modificador / botón central: abrir en pestaña nueva.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.()

    if (pathname !== '/') {
      // Desde otra ruta la sección aún no existe: navegamos y ScrollToHash
      // hace el scroll cuando haya montado.
      navigate(href)
      return
    }

    if (params) {
      // Aplica el filtro sin que React Router mueva el scroll por su cuenta;
      // del scroll nos encargamos abajo.
      navigate(href, { replace: true, preventScrollReset: true })
    } else {
      // Sin filtros no hace falta re-renderizar: basta con dejar la URL
      // compartible.
      window.history.replaceState(null, '', href)
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
