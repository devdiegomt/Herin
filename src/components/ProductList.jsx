import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import ProductCard from './ProductCard'
import { useAsyncData } from '../hooks/useAsyncData'
import { fetchProducts, fetchCategories } from '../data/api'

/**
 * El catálogo guarda categoría y búsqueda en la URL (?cat=velas&q=conejo).
 * Así se puede compartir "el link de las velas" desde Instagram, y al volver
 * desde el detalle de un producto no se pierde el filtro.
 */
export default function ProductList() {
  const [params, setParams] = useSearchParams()
  const activeCat = params.get('cat') ?? 'all'
  const urlQuery = params.get('q') ?? ''

  // Input local: no reescribimos la URL en cada tecla
  const [draft, setDraft] = useState(urlQuery)
  useEffect(() => setDraft(urlQuery), [urlQuery])

  useEffect(() => {
    if (draft === urlQuery) return
    const t = setTimeout(() => updateParams({ q: draft }), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  function updateParams(next) {
    const merged = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === 'all') merged.delete(key)
      else merged.set(key, value)
    }
    setParams(merged, { replace: true, preventScrollReset: true })
  }

  const { data: products, loading, error } = useAsyncData(fetchProducts, [])
  const { data: cats } = useAsyncData(fetchCategories, [])

  const categories = useMemo(
    () => [{ slug: 'all', label: 'Todo' }, ...(cats ?? [])],
    [cats],
  )

  const filtered = useMemo(() => {
    if (!products) return []
    const q = normalize(urlQuery)
    return products.filter((p) => {
      if (activeCat !== 'all' && p.categorySlug !== activeCat) return false
      if (!q) return true
      // Busca en nombre, descripción, categoría y etiqueta a la vez
      const haystack = normalize(
        `${p.name} ${p.description} ${p.categoryLabel} ${p.tag ?? ''}`,
      )
      return q.split(/\s+/).every((word) => haystack.includes(word))
    })
  }, [products, activeCat, urlQuery])

  const hasFilters = activeCat !== 'all' || urlQuery !== ''
  const activeLabel = categories.find((c) => c.slug === activeCat)?.label

  return (
    <section id="productos" className="bg-paper pb-20 sm:pb-28">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8 text-center">
        <p className="font-body text-[11px] tracking-[0.25em] uppercase text-terracotta mb-3">
          Catálogo
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-3">
          Nuestras <span className="italic font-normal">creaciones</span>
        </h2>
        <p className="font-body text-sm text-warm-gray max-w-md mx-auto">
          Cada pieza es moldeada, pintada y cuidada a mano.
        </p>
      </div>

      {/* Barra de filtros: queda pegada bajo el navbar al hacer scroll */}
      <div className="sticky top-16 sm:top-20 z-30 bg-paper/95 backdrop-blur-md border-y border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Categorías */}
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateParams({ cat: cat.slug })}
                aria-pressed={activeCat === cat.slug}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeCat === cat.slug
                    ? 'bg-charcoal text-paper'
                    : 'border border-line text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Búsqueda */}
          <div className="sm:w-64 flex items-center gap-2 border border-line rounded-full px-4 py-2 focus-within:border-charcoal/30 transition-colors">
            <Search size={16} className="text-warm-gray shrink-0" />
            <input
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Buscar…"
              aria-label="Buscar productos"
              className="bg-transparent outline-none w-full text-sm text-charcoal placeholder:text-warm-gray/60"
            />
            {draft && (
              <button
                onClick={() => setDraft('')}
                aria-label="Limpiar búsqueda"
                className="text-warm-gray hover:text-charcoal transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">
        {/* Contador / limpiar */}
        {!loading && !error && (
          <div className="flex items-center justify-between gap-3 mb-5 min-h-6">
            <p className="font-body text-xs text-warm-gray">
              {filtered.length} {filtered.length === 1 ? 'pieza' : 'piezas'}
              {activeCat !== 'all' && activeLabel ? ` en ${activeLabel}` : ''}
            </p>
            {hasFilters && (
              <button
                onClick={() => updateParams({ cat: 'all', q: '' })}
                className="font-body text-xs text-terracotta hover:text-terracotta-dark transition-colors"
              >
                Ver todo
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-cream rounded-2xl mb-3" />
                <div className="h-3.5 bg-cream rounded w-2/3 mb-2" />
                <div className="h-3 bg-cream/70 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <p className="font-body text-warm-gray mb-4">No pudimos cargar el catálogo.</p>
            <button
              onClick={() => window.location.reload()}
              className="font-body text-sm text-terracotta hover:underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-display text-xl text-charcoal mb-2">
              Nada coincide con tu búsqueda
            </p>
            <p className="font-body text-sm text-warm-gray mb-6">
              Prueba con otra palabra o mira todo el catálogo.
            </p>
            <button
              onClick={() => updateParams({ cat: 'all', q: '' })}
              className="inline-flex items-center justify-center bg-charcoal hover:bg-charcoal/85 text-paper px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Quita tildes y pasa a minúsculas: "bambi" encuentra "Bambí", "cafe" encuentra "café".
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}
