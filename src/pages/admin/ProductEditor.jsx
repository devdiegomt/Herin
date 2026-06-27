import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Save, Loader2, Upload, Star, Trash2, X,
} from 'lucide-react'
import {
  fetchCategories, adminFetchProducts, createProduct, updateProduct,
  uploadProductImage, deleteProductImage, setPrimaryImage,
} from '../../data/api'
import { useAsyncData } from '../../hooks/useAsyncData'

export default function ProductEditor() {
  const { id } = useParams()
  const isNew = id === 'nuevo'
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const { data: categories } = useAsyncData(fetchCategories, [])

  const [form, setForm] = useState({
    name: '', categoryId: '', price: '', tag: '',
    description: '', descriptionLong: '', active: true,
  })
  const [existingImages, setExistingImages] = useState([]) // ya en la base
  const [newFiles, setNewFiles] = useState([]) // File[] pendientes (modo nuevo)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [productId] = useState(isNew ? null : id)

  // Carga el producto en modo edición
  useEffect(() => {
    if (isNew) return
    let alive = true
    adminFetchProducts()
      .then((all) => {
        const p = all.find((x) => x.id === id)
        if (!p) throw new Error('not found')
        if (!alive) return
        setForm({
          name: p.name,
          categoryId: p.categoryId ?? '',
          price: String(p.price ?? ''),
          tag: p.tag ?? '',
          description: p.description ?? '',
          descriptionLong: p.descriptionLong ?? '',
          active: p.active,
        })
        setExistingImages(p.rawImages ?? [])
      })
      .catch(() => alive && setError('No se encontró el producto.'))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [id, isNew])

  // Default categoría al cargar
  useEffect(() => {
    if (categories?.length && !form.categoryId) {
      setForm((f) => ({ ...f, categoryId: categories[0].id }))
    }
  }, [categories]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: v }))
  }

  const handleFilePick = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (isNew) {
      // Guardamos los File para subirlos al crear
      setNewFiles((prev) => [...prev, ...files])
    } else {
      // En edición, subimos de una vez
      uploadNow(files)
    }
    e.target.value = ''
  }

  const uploadNow = async (files) => {
    setSaving(true)
    try {
      const slug = form.name ? slugify(form.name) : 'producto'
      let order = existingImages.length
      const isFirst = existingImages.length === 0
      for (let i = 0; i < files.length; i++) {
        const img = await uploadProductImage(
          productId, slug, files[i], order + i, isFirst && i === 0,
        )
        setExistingImages((prev) => [...prev, img])
      }
    } catch {
      alert('No se pudo subir la imagen.')
    } finally {
      setSaving(false)
    }
  }

  const removeExisting = async (img) => {
    setSaving(true)
    try {
      await deleteProductImage(img.id, img.storage_path)
      setExistingImages((prev) => prev.filter((x) => x.id !== img.id))
    } catch {
      alert('No se pudo borrar la imagen.')
    } finally {
      setSaving(false)
    }
  }

  const makePrimary = async (img) => {
    setSaving(true)
    try {
      await setPrimaryImage(productId, img.id)
      setExistingImages((prev) =>
        prev.map((x) => ({ ...x, is_primary: x.id === img.id })),
      )
    } catch {
      alert('No se pudo marcar como principal.')
    } finally {
      setSaving(false)
    }
  }

  const removeNewFile = (idx) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSave = async () => {
    setError(null)
    if (!form.name.trim()) { setError('El nombre es obligatorio.'); return }
    if (!form.categoryId) { setError('Elige una categoría.'); return }

    setSaving(true)
    try {
      if (isNew) {
        await createProduct(form, newFiles)
      } else {
        await updateProduct(productId, form)
      }
      navigate('/admin')
    } catch (err) {
      setError('No se pudo guardar. ' + (err.message || ''))
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light">
        <Loader2 className="animate-spin text-warm-gray" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <header className="bg-white border-b border-sand/60 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 text-warm-gray hover:text-charcoal transition">
            <ArrowLeft size={18} />
            <span className="text-sm">Volver</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-moss hover:bg-moss-light text-cream-light px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Guardar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-6">
          {isNew ? 'Nuevo producto' : 'Editar producto'}
        </h1>

        {error && (
          <p className="text-sm text-terracotta-dark bg-terracotta/10 rounded-lg px-4 py-3 mb-6">
            {error}
          </p>
        )}

        <div className="space-y-6">
          {/* Datos */}
          <div className="bg-white rounded-2xl border border-sand/60 p-5 sm:p-6 space-y-4">
            <Field label="Nombre">
              <input
                type="text" value={form.name} onChange={set('name')}
                className={inputCls} placeholder="Ej: Matera elefante azul"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Categoría">
                <select value={form.categoryId} onChange={set('categoryId')} className={inputCls}>
                  {(categories ?? []).map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Precio (COP)">
                <input
                  type="number" value={form.price} onChange={set('price')}
                  className={inputCls} placeholder="18000" min="0"
                />
              </Field>
            </div>

            <Field label="Etiqueta (opcional)">
              <input
                type="text" value={form.tag} onChange={set('tag')}
                className={inputCls} placeholder="Ej: Edición limitada"
              />
            </Field>

            <Field label="Descripción corta (tarjeta del catálogo)">
              <textarea
                value={form.description} onChange={set('description')}
                rows={2} className={inputCls} placeholder="Una línea que resuma el producto."
              />
            </Field>

            <Field label="Descripción larga (vista de detalle)">
              <textarea
                value={form.descriptionLong} onChange={set('descriptionLong')}
                rows={4} className={inputCls} placeholder="Materiales, tamaño, detalles…"
              />
            </Field>

            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox" checked={form.active} onChange={set('active')}
                className="w-4 h-4 accent-moss"
              />
              <span className="text-sm text-charcoal">Visible en el catálogo</span>
            </label>
          </div>

          {/* Galería */}
          <div className="bg-white rounded-2xl border border-sand/60 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-charcoal">Fotos</h2>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={saving}
                className="flex items-center gap-2 text-sm border border-sand text-charcoal px-3 py-1.5 rounded-lg hover:bg-sand/30 transition disabled:opacity-50"
              >
                <Upload size={16} />
                Subir
              </button>
              <input
                ref={fileInputRef} type="file" accept="image/*" multiple
                onChange={handleFilePick} className="hidden"
              />
            </div>

            {isNew && (
              <p className="text-xs text-warm-gray mb-4">
                Las fotos se subirán al guardar el producto. La primera será la principal.
              </p>
            )}

            {/* Grid de imágenes */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {/* Existentes (edición) */}
              {existingImages.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-sand/30 group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  {img.is_primary && (
                    <span className="absolute top-1 left-1 bg-moss text-cream-light text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star size={10} /> Principal
                    </span>
                  )}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                    {!img.is_primary && (
                      <button
                        onClick={() => makePrimary(img)}
                        title="Marcar principal"
                        className="bg-white/90 text-charcoal p-1.5 rounded-lg hover:bg-white"
                      >
                        <Star size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => removeExisting(img)}
                      title="Borrar"
                      className="bg-white/90 text-red-600 p-1.5 rounded-lg hover:bg-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Nuevas pendientes (modo nuevo) */}
              {newFiles.map((file, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-sand/30 group">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-moss text-cream-light text-[10px] px-1.5 py-0.5 rounded-full">
                      Principal
                    </span>
                  )}
                  <button
                    onClick={() => removeNewFile(idx)}
                    className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {existingImages.length === 0 && newFiles.length === 0 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-sand flex flex-col items-center justify-center text-warm-gray hover:border-terracotta hover:text-terracotta transition"
                >
                  <Upload size={20} />
                  <span className="text-xs mt-1">Subir</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// --- helpers ---
const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-sand bg-cream-light/40 text-charcoal text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-warm-gray mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function slugify(txt) {
  return txt
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}
