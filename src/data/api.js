import { supabase } from '../lib/supabase'
import { optimizeImage } from '../utils/optimizeImage'

/**
 * Capa de acceso a datos de Herin.
 * Todo lo que lee/escribe en Supabase pasa por aquí, para tener un solo
 * lugar que mantener si el esquema cambia.
 */

// Trae las categorías ordenadas (Materas, Velas, ...)
export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, label, sort_order')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

// Trae los productos activos con su imagen principal, para el catálogo.
// Une product_images para sacar la foto marcada como is_primary.
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, description, price, tag, sort_order,
      category:categories ( slug, label ),
      images:product_images ( url, is_primary, sort_order )
    `)
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error

  return (data ?? []).map(normalizeProduct)
}

// Trae UN producto por su slug, con TODA la galería, para la vista de detalle.
export async function fetchProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, description, description_long, price, tag, active,
      category:categories ( slug, label ),
      images:product_images ( url, is_primary, sort_order )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return normalizeProduct(data)
}

// Productos relacionados: misma categoría, distinto producto.
// El filtro por categoría va en la consulta (no en JS después del limit),
// si no el limit recorta antes de filtrar y devuelve menos de los pedidos.
export async function fetchRelated(categorySlug, excludeSlug, limit = 4) {
  if (!categorySlug) return []

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, price, tag,
      category:categories!inner ( slug ),
      images:product_images ( url, is_primary, sort_order )
    `)
    .eq('active', true)
    .eq('categories.slug', categorySlug)
    .neq('slug', excludeSlug)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error

  return (data ?? []).map(normalizeProduct)
}

// --- Helpers ---

/**
 * Limpia el texto que escribe una persona en el panel.
 *
 * `cleanLine` es para campos de una línea (nombre, etiqueta): quita los
 * espacios de los extremos y colapsa los dobles espacios de en medio. Un
 * espacio invisible al final se cuela fácil al escribir desde el celular, y
 * salía en el título de la pestaña y en la vista previa de WhatsApp como
 * "Conejo orejón  — Herin".
 *
 * `cleanText` es para descripciones: solo recorta los extremos, porque los
 * saltos de línea de en medio son intencionales.
 */
export function cleanLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

export function cleanText(value) {
  return String(value ?? '').trim()
}

// Normaliza la forma del producto: ordena imágenes, expone primary y galería.
function normalizeProduct(p) {
  const images = (p.images ?? [])
    .slice()
    .sort((a, b) => {
      // la primaria primero, luego por sort_order
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      return (a.sort_order ?? 0) - (b.sort_order ?? 0)
    })

  const primary = images.find((i) => i.is_primary) ?? images[0] ?? null

  return {
    id: p.id,
    slug: p.slug,
    // Se limpia también al leer: así los productos que ya están guardados con
    // espacios de más se ven bien sin tener que editarlos uno por uno.
    name: cleanLine(p.name),
    description: cleanText(p.description),
    descriptionLong: cleanText(p.description_long || p.description),
    price: Number(p.price ?? 0),
    tag: p.tag ? cleanLine(p.tag) : null,
    active: p.active ?? true,
    categorySlug: p.category?.slug ?? null,
    categoryLabel: p.category?.label ?? '',
    images: images.map((i) => i.url),
    image: primary?.url ?? null,
  }
}

// Formatea un número como precio colombiano: 18000 -> "$18.000"
export function formatPrice(value) {
  const n = Number(value ?? 0)
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

// =====================================================================
// Funciones de ADMIN (escritura). Requieren sesión autenticada.
// =====================================================================

const BUCKET = 'product-images'

// Trae TODOS los productos (activos e inactivos) para el panel admin.
export async function adminFetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, description, description_long, price, tag, active, sort_order,
      category:categories ( id, slug, label ),
      images:product_images ( id, url, storage_path, is_primary, sort_order )
    `)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map((p) => ({
    ...normalizeProduct(p),
    categoryId: p.category?.id ?? null,
    rawImages: (p.images ?? []).slice().sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    ),
  }))
}

// Crea un producto. images: array de File. Devuelve el id creado.
export async function createProduct(fields, images = []) {
  const { data: prod, error } = await supabase
    .from('products')
    .insert({
      // Limpiamos aquí y no en el formulario: así ninguna ruta de guardado
      // puede saltárselo, igual que con la optimización de imágenes.
      name: cleanLine(fields.name),
      slug: fields.slug || undefined, // el trigger genera el slug si va vacío
      category_id: fields.categoryId || null,
      description: cleanText(fields.description),
      description_long: cleanText(fields.descriptionLong),
      price: Number(fields.price) || 0,
      tag: cleanLine(fields.tag) || null,
      active: fields.active ?? true,
      sort_order: fields.sortOrder ?? 0,
    })
    .select('id, slug')
    .single()

  if (error) throw error

  for (let i = 0; i < images.length; i++) {
    await uploadProductImage(prod.id, prod.slug, images[i], i, i === 0)
  }
  return prod.id
}

// Actualiza los campos de un producto existente.
export async function updateProduct(id, fields) {
  const { error } = await supabase
    .from('products')
    .update({
      name: cleanLine(fields.name),
      category_id: fields.categoryId || null,
      description: cleanText(fields.description),
      description_long: cleanText(fields.descriptionLong),
      price: Number(fields.price) || 0,
      tag: cleanLine(fields.tag) || null,
      active: fields.active ?? true,
      sort_order: fields.sortOrder ?? 0,
    })
    .eq('id', id)

  if (error) throw error
}

// Cambia solo el estado activo/inactivo (toggle rápido en la lista).
export async function toggleProductActive(id, active) {
  const { error } = await supabase
    .from('products')
    .update({ active })
    .eq('id', id)
  if (error) throw error
}

// Elimina un producto y todas sus fotos (base + Storage).
export async function deleteProduct(id) {
  // Trae las rutas de Storage para borrarlas también
  const { data: imgs } = await supabase
    .from('product_images')
    .select('storage_path')
    .eq('product_id', id)

  const paths = (imgs ?? []).map((i) => i.storage_path).filter(Boolean)
  if (paths.length) {
    await supabase.storage.from(BUCKET).remove(paths)
  }

  // product_images se borra en cascada por la FK
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// Sube UNA imagen al Storage y la registra en product_images.
// Toda subida pasa por aquí, así que aquí es donde garantizamos que la foto
// va optimizada: si el editor ya la proceso, optimizeImage la deja igual.
export async function uploadProductImage(productId, slug, file, sortOrder = 0, isPrimary = false) {
  const { file: optimized } = await optimizeImage(file)

  const ext = (optimized.name?.split('.').pop() || 'webp').toLowerCase()
  const safeName = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(safeName, optimized, {
      contentType: optimized.type || 'image/webp',
      upsert: true,
      // Las fotos no cambian una vez subidas (cada una tiene nombre único),
      // así que el navegador puede cachearlas un año.
      cacheControl: '31536000',
    })
  if (upErr) throw upErr

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(safeName)

  const { data, error } = await supabase
    .from('product_images')
    .insert({
      product_id: productId,
      url: pub.publicUrl,
      storage_path: safeName,
      is_primary: isPrimary,
      sort_order: sortOrder,
    })
    .select('id, url, storage_path, is_primary, sort_order')
    .single()
  if (error) throw error
  return data
}

// Borra una imagen (Storage + registro).
export async function deleteProductImage(imageId, storagePath) {
  if (storagePath) {
    await supabase.storage.from(BUCKET).remove([storagePath])
  }
  const { error } = await supabase.from('product_images').delete().eq('id', imageId)
  if (error) throw error
}

// Marca una imagen como principal (y desmarca las demás del producto).
export async function setPrimaryImage(productId, imageId) {
  // desmarca todas
  await supabase
    .from('product_images')
    .update({ is_primary: false })
    .eq('product_id', productId)
  // marca la elegida
  const { error } = await supabase
    .from('product_images')
    .update({ is_primary: true })
    .eq('id', imageId)
  if (error) throw error
}

// Reordena imágenes: recibe array de {id, sort_order}.
export async function reorderImages(items) {
  for (const it of items) {
    await supabase
      .from('product_images')
      .update({ sort_order: it.sort_order })
      .eq('id', it.id)
  }
}
