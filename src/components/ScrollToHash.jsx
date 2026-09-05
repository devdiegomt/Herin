import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al llegar a "/#seccion" desde otra ruta, hace scroll a esa sección una vez
 * que el DOM ya montó. El offset del navbar lo resuelve `scroll-mt` en CSS.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    // rAF doble: espera a que la sección exista tras el cambio de ruta
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }),
    )
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
