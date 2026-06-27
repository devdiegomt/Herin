import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useAsyncData } from '../hooks/useAsyncData'
import { fetchProductBySlug, fetchRelated, formatPrice } from '../data/api'
import { getWhatsAppLink } from '../utils/whatsapp'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: product, loading, error } = useAsyncData(
    () => fetchProductBySlug(slug),
    [slug],
  )

  // Sube al inicio al cambiar de producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-20 min-h-screen bg-cream-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {loading && <DetailSkeleton />}

          {error && !loading && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-charcoal mb-4">
                No encontramos este producto
              </p>
              <Link to="/" className="text-terracotta hover:underline">
                ← Volver al catálogo
              </Link>
            </div>
          )}

          {product && !loading && <DetailContent product={product} />}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function DetailContent({ product }) {
  const {
    name, slug, descriptionLong, price, tag,
    categorySlug, categoryLabel, images,
  } = product

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-warm-gray mb-8 flex-wrap">
        <Link to="/" className="hover:text-terracotta transition-colors">Catálogo</Link>
        <span className="text-sand">/</span>
        <Link to={`/#productos`} className="hover:text-terracotta transition-colors">
          {categoryLabel || 'Productos'}
        </Link>
        <span className="text-sand">/</span>
        <span className="text-charcoal">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <Gallery images={images} tag={tag} name={name} />

        {/* Info */}
        <div className="lg:pt-4">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-terracotta mb-3">
            {categoryLabel}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            {name}
          </h1>
          <p className="font-display text-2xl sm:text-3xl text-terracotta mb-6">
            {formatPrice(price)}
          </p>

          <p className="font-body text-warm-gray leading-relaxed mb-8 whitespace-pre-line">
            {descriptionLong}
          </p>

          <a
            href={getWhatsAppLink(name, formatPrice(price))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-moss hover:bg-moss-light text-cream-light py-4 rounded-xl text-base font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-moss/20 mb-3"
          >
            <MessageCircle size={18} />
            Consultar por WhatsApp
          </a>
          <Link
            to="/#productos"
            className="flex items-center justify-center gap-2 w-full border border-charcoal/20 hover:border-charcoal/40 text-charcoal py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:bg-charcoal/5"
          >
            <ArrowLeft size={16} />
            Volver al catálogo
          </Link>
        </div>
      </div>

      <Related categorySlug={categorySlug} excludeSlug={slug} />
    </>
  )
}

function Gallery({ images, tag, name }) {
  const [active, setActive] = useState(0)
  const hasImages = images && images.length > 0
  const safeImages = hasImages ? images : [null]
  const go = (dir) =>
    setActive((i) => (i + dir + safeImages.length) % safeImages.length)

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand/30 mb-3">
        {safeImages[active] ? (
          <img
            src={safeImages[active]}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray/40">
            Sin imagen
          </div>
        )}

        {tag && (
          <span className="absolute top-4 left-4 bg-moss text-cream-light text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
            {tag}
          </span>
        )}

        {/* Arrows (only if multiple) */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm hover:bg-white text-charcoal p-2 rounded-full shadow-sm transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm hover:bg-white text-charcoal p-2 rounded-full shadow-sm transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded-lg overflow-hidden bg-sand/30 transition-all ${
                active === i
                  ? 'ring-2 ring-terracotta'
                  : 'ring-1 ring-transparent hover:ring-sand'
              }`}
            >
              {img && (
                <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Related({ categorySlug, excludeSlug }) {
  const { data: related } = useAsyncData(
    () => fetchRelated(categorySlug, excludeSlug, 4),
    [categorySlug, excludeSlug],
  )

  if (!related || related.length === 0) return null

  return (
    <section className="mt-16 sm:mt-24 border-t border-sand/60 pt-12">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-8">
        También te puede gustar
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/producto/${p.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-square overflow-hidden bg-sand/30">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray/40 text-xs">
                  Sin imagen
                </div>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <p className="font-display text-base font-semibold text-charcoal leading-tight mb-1 group-hover:text-terracotta transition-colors">
                {p.name}
              </p>
              <p className="font-body text-sm text-terracotta">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 animate-pulse">
      <div>
        <div className="aspect-square bg-sand/40 rounded-2xl mb-3" />
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-sand/30 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="pt-4">
        <div className="h-3 bg-sand/40 rounded w-24 mb-4" />
        <div className="h-10 bg-sand/40 rounded w-3/4 mb-4" />
        <div className="h-8 bg-sand/40 rounded w-32 mb-6" />
        <div className="space-y-2 mb-8">
          <div className="h-3 bg-sand/30 rounded w-full" />
          <div className="h-3 bg-sand/30 rounded w-full" />
          <div className="h-3 bg-sand/30 rounded w-2/3" />
        </div>
        <div className="h-12 bg-sand/40 rounded-xl w-full" />
      </div>
    </div>
  )
}
