import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import MobileBar from '../components/MobileBar'
import Seo, { ProductJsonLd } from '../components/Seo'
import { useAsyncData } from '../hooks/useAsyncData'
import { fetchProductBySlug, fetchRelated, formatPrice } from '../data/api'
import { getWhatsAppLink } from '../utils/whatsapp'
import { site, store } from '../config/site'

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
      {product && (
        <>
          <Seo
            title={product.name}
            description={
              product.description ||
              `${product.name} — pieza artesanal de Herin, hecha a mano en ${site.city}.`
            }
            image={product.image}
            path={`/producto/${product.slug}`}
            type="product"
          />
          <ProductJsonLd
            product={product}
            url={`${site.url}/producto/${product.slug}`}
          />
        </>
      )}

      <Navbar />
      <main className="pt-24 sm:pt-28 pb-20 min-h-screen bg-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {loading && <DetailSkeleton />}

          {error && !loading && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-charcoal mb-4">
                No encontramos este producto
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-charcoal hover:bg-charcoal/85 text-paper px-6 py-3 rounded-full text-sm font-medium transition-colors"
              >
                Ver el catálogo
              </Link>
            </div>
          )}

          {product && !loading && <DetailContent product={product} />}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
    </>
  )
}

function DetailContent({ product }) {
  const {
    name, slug, description, descriptionLong, price, tag,
    categorySlug, categoryLabel, images,
  } = product

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-warm-gray mb-8 flex-wrap">
        <Link to="/" className="hover:text-terracotta transition-colors">
          Catálogo
        </Link>
        <span className="text-line">/</span>
        <Link
          to={`/?cat=${categorySlug}#productos`}
          className="hover:text-terracotta transition-colors"
        >
          {categoryLabel || 'Productos'}
        </Link>
        <span className="text-line">/</span>
        <span className="text-charcoal">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <Gallery images={images} tag={tag} name={name} />

        {/* Info */}
        <div className="lg:pt-4">
          <p className="font-body text-[11px] tracking-[0.22em] uppercase text-terracotta mb-3">
            {categoryLabel}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-3 leading-tight">
            {name}
          </h1>
          <p className="font-body text-2xl text-charcoal font-semibold mb-6">
            {formatPrice(price)}
          </p>

          {(descriptionLong || description) && (
            <p className="font-body text-warm-gray leading-relaxed mb-8 whitespace-pre-line">
              {descriptionLong || description}
            </p>
          )}

          <a
            href={getWhatsAppLink(name, formatPrice(price))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-moss hover:bg-moss-light text-paper py-4 rounded-full text-base font-semibold tracking-wide transition-colors mb-3"
          >
            <MessageCircle size={18} />
            Consultar por WhatsApp
          </a>
          <Link
            to={`/?cat=${categorySlug}#productos`}
            className="flex items-center justify-center gap-2 w-full border border-line hover:border-charcoal/35 text-charcoal py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors"
          >
            <ArrowLeft size={16} />
            Ver más {categoryLabel?.toLowerCase() || 'productos'}
          </Link>

          {/* Recordatorio del punto físico: reduce la fricción de comprar */}
          <div className="mt-8 flex items-start gap-3 border-t border-line pt-6">
            <MapPin size={16} className="text-terracotta shrink-0 mt-0.5" />
            <p className="font-body text-sm text-warm-gray leading-relaxed">
              También puedes verla en persona en{' '}
              <a
                href={store.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-terracotta transition-colors underline underline-offset-2"
              >
                {store.name}
              </a>
              , {store.address}.
            </p>
          </div>
        </div>
      </div>

      <Related categorySlug={categorySlug} excludeSlug={slug} />
    </>
  )
}

function Gallery({ images, tag, name }) {
  const [active, setActive] = useState(0)
  const safeImages = images?.length ? images : [null]
  const go = (dir) =>
    setActive((i) => (i + dir + safeImages.length) % safeImages.length)

  // Flechas del teclado para navegar la galería
  useEffect(() => {
    if (safeImages.length < 2) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.length])

  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream mb-3">
        {safeImages[active] ? (
          <img
            src={safeImages[active]}
            alt={name}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray/40">
            Sin imagen
          </div>
        )}

        {tag && (
          <span className="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
            {tag}
          </span>
        )}

        {safeImages.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-paper/90 backdrop-blur-sm hover:bg-paper text-charcoal p-2 rounded-full shadow-sm transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-paper/90 backdrop-blur-sm hover:bg-paper text-charcoal p-2 rounded-full shadow-sm transition-all"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur-sm text-charcoal text-[11px] font-medium px-2.5 py-1 rounded-full">
              {active + 1} / {safeImages.length}
            </span>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1} de ${safeImages.length}`}
              aria-current={active === i}
              className={`aspect-square rounded-lg overflow-hidden bg-cream transition-all ${
                active === i
                  ? 'ring-2 ring-charcoal'
                  : 'ring-1 ring-line hover:ring-charcoal/30'
              }`}
            >
              {img && (
                <img
                  src={img}
                  alt={`${name} ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
    <section className="mt-16 sm:mt-24 border-t border-line pt-12">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-8">
        También te puede gustar
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {related.map((p) => (
          <Link key={p.id} to={`/producto/${p.slug}`} className="group">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream mb-3">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray/40 text-xs">
                  Sin imagen
                </div>
              )}
            </div>
            <p className="font-display text-base sm:text-lg font-semibold text-charcoal leading-tight mb-0.5 group-hover:text-terracotta transition-colors">
              {p.name}
            </p>
            <p className="font-body text-sm text-charcoal font-medium">
              {formatPrice(p.price)}
            </p>
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
        <div className="aspect-square bg-cream rounded-2xl mb-3" />
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-cream/70 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="pt-4">
        <div className="h-3 bg-cream rounded w-24 mb-4" />
        <div className="h-10 bg-cream rounded w-3/4 mb-4" />
        <div className="h-7 bg-cream rounded w-32 mb-6" />
        <div className="space-y-2 mb-8">
          <div className="h-3 bg-cream/70 rounded w-full" />
          <div className="h-3 bg-cream/70 rounded w-full" />
          <div className="h-3 bg-cream/70 rounded w-2/3" />
        </div>
        <div className="h-13 bg-cream rounded-full w-full" />
      </div>
    </div>
  )
}
