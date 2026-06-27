import { useState, useEffect } from 'react'

/**
 * Hook genérico para cargar datos asíncronos de Supabase.
 * Maneja loading / error / data y evita actualizar estado si el
 * componente se desmontó.
 *
 * @param {Function} loader - función async que devuelve los datos
 * @param {Array} deps - dependencias que disparan recarga
 */
export function useAsyncData(loader, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)

    loader()
      .then((result) => {
        if (alive) setData(result)
      })
      .catch((err) => {
        if (alive) setError(err)
        console.error('[Herin] Error cargando datos:', err)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
