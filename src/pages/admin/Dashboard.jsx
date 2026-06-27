import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, Search, Package } from 'lucide-react'
import { useAsyncData } from '../../hooks/useAsyncData'
import { adminFetchProducts, toggleProductActive, deleteProduct, formatPrice } from '../../data/api'
import { signOut } from '../../auth/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const { data: products, loading, error } = useAsyncData(
    adminFetchProducts,
    [refreshKey],
  )

  const refresh = () => setRefreshKey((k) => k + 1)

  const filtered = useMemo(() => {
    if (!products) return []
    const q = query.trim().toLowerCase()
    return products.filter((p) => !q || p.name.toLowerCase().includes(q))
  }, [products, query])

  const handleToggle = async (p) => {
    setBusy(p.id)
    try {
      await toggleProductActive(p.id, !p.active)
      refresh()
    } catch {
      alert('No se pudo cambiar el estado.')
    } finally {
      setBusy(null)
    }
  }

  const handleDelete = async (p) => {
    setBusy(p.id)
    try {
      await deleteProduct(p.id)
      setConfirmDelete(null)
      refresh()
    } catch {
      alert('No se pudo eliminar el producto.')
    } finally {
      setBusy(null)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Top bar */}
      <header className="bg-white border-b border-sand/60 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-2xl font-semibold text-charcoal tracking-wide">
              HERIN
            </Link>
            <span className="text-xs text-warm-gray bg-sand/50 px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-warm-gray hover:text-terracotta transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal">Productos</h1>
            <p className="text-sm text-warm-gray mt-1">
              {products ? `${products.length} en total` : 'Cargando…'}
            </p>
          </div>
          <Link
            to="/admin/producto/nuevo"
            className="flex items-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
          >
            <Plus size={18} />
            Nuevo producto
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-sand rounded-xl px-4 py-2.5 mb-6 max-w-md">
          <Search size={18} className="text-warm-gray shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className="bg-transparent outline-none w-full text-sm text-charcoal"
          />
        </div>

        {/* States */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-xl border border-sand/60 animate-pulse" />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-warm-gray py-8 text-center">No se pudieron cargar los productos.</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <Package size={40} className="mx-auto text-warm-gray/40 mb-3" />
            <p className="text-warm-gray">
              {query ? 'No hay productos que coincidan.' : 'Aún no hay productos. Crea el primero.'}
            </p>
          </div>
        )}

        {/* Product list */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`flex items-center gap-4 bg-white rounded-xl border border-sand/60 p-3 sm:p-4 transition ${
                  !p.active ? 'opacity-60' : ''
                }`}
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-sand/30 shrink-0">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-warm-gray/40">
                      <Package size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-charcoal truncate">{p.name}</h3>
                    {p.tag && (
                      <span className="text-xs bg-moss/10 text-moss px-2 py-0.5 rounded-full">{p.tag}</span>
                    )}
                    {!p.active && (
                      <span className="text-xs bg-warm-gray/15 text-warm-gray px-2 py-0.5 rounded-full">
                        Oculto
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-warm-gray mt-0.5">
                    {p.categoryLabel} · {formatPrice(p.price)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggle(p)}
                    disabled={busy === p.id}
                    title={p.active ? 'Ocultar del catálogo' : 'Mostrar en el catálogo'}
                    className="p-2 text-warm-gray hover:text-charcoal hover:bg-sand/40 rounded-lg transition disabled:opacity-40"
                  >
                    {p.active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <Link
                    to={`/admin/producto/${p.id}`}
                    title="Editar"
                    className="p-2 text-warm-gray hover:text-terracotta hover:bg-sand/40 rounded-lg transition"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(p)}
                    title="Eliminar"
                    className="p-2 text-warm-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 px-5">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
              ¿Eliminar producto?
            </h3>
            <p className="text-sm text-warm-gray mb-6">
              Se eliminará <span className="font-medium text-charcoal">{confirmDelete.name}</span> y
              todas sus fotos. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-sand text-charcoal py-2.5 rounded-xl text-sm font-medium hover:bg-sand/30 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={busy === confirmDelete.id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
              >
                {busy === confirmDelete.id ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
