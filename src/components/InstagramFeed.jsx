import { useEffect, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import InstagramIcon from './icons/InstagramIcon'
import { contact, instagramUrl } from '../config/site'
import { loadInstagramFeed } from '../utils/instagramFeed'

const IG_HANDLE = contact.instagram
const IG_PROFILE = instagramUrl

/**
 * Fotos de respaldo.
 *
 * Se usan cuando no hay feed configurado (contact.instagramSourceUrl en
 * src/config/site.js) o cuando el proveedor no responde. Así la sección nunca
 * queda vacía ni muestra un error.
 *
 * Para cambiarlas a mano:
 *   image → foto cuadrada (1:1). Guárdala en public/images/instagram/
 *   href  → enlace a la publicación real. Ábrela en Instagram y copia la URL.
 *   alt   → qué se ve en la foto (lectores de pantalla y buscadores).
 */
const fallbackPosts = [
  { id: 'f1', image: '/images/products/flowerpots/matera1.webp', href: IG_PROFILE, alt: 'Matera artesanal Herin' },
  { id: 'f2', image: '/images/products/candles/vela1.webp', href: IG_PROFILE, alt: 'Vela artesanal Herin' },
  { id: 'f3', image: '/images/products/flowerpots/matera2.webp', href: IG_PROFILE, alt: 'Colección de materas' },
  { id: 'f4', image: '/images/products/flowerpots/matera6.webp', href: IG_PROFILE, alt: 'Detalles de matera' },
  { id: 'f5', image: '/images/products/candles/vela7.webp', href: IG_PROFILE, alt: 'Velas aromáticas' },
  { id: 'f6', image: '/images/products/flowerpots/matera7.webp', href: IG_PROFILE, alt: 'Piezas nuevas' },
]

export default function InstagramFeed() {
  const refHeader = useReveal()
  const { posts, isLive } = useFeed()

  return (
    <section id="instagram" className="py-20 sm:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          ref={refHeader}
          className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
              Síguenos
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal leading-tight">
              {/* Solo prometemos "lo último" cuando de verdad viene de Instagram */}
              {isLive ? 'Lo último desde' : 'Encuéntranos en'}
              <br />
              <span className="italic font-normal">@{IG_HANDLE}</span>
            </h2>
          </div>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-medium text-charcoal hover:text-terracotta transition-colors group"
          >
            <InstagramIcon size={18} />
            Ver perfil completo
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {posts.map((post, i) => (
            <PostTile key={post.id} post={post} index={i} />
          ))}
        </div>

        <p className="text-center font-body text-xs text-warm-gray/70 mt-8 tracking-wide">
          Publicamos piezas nuevas e historias del taller en Instagram
        </p>
      </div>
    </section>
  )
}

/**
 * Trae el feed real si hay uno configurado. Cualquier fallo (sin URL, red
 * caída, feed vacío) deja las fotos de respaldo, que es lo que ya se está
 * mostrando: la sección no parpadea ni enseña un error.
 */
function useFeed() {
  const [posts, setPosts] = useState(fallbackPosts)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    // Pedimos nuestra propia ruta, no Behold: /api/instagram cachea la
    // respuesta para no gastar el cupo mensual del plan gratuito.
    if (!contact.instagramSourceUrl) return
    const url = contact.instagramFeedPath

    let alive = true
    loadInstagramFeed(url, 6)
      .then((real) => {
        if (!alive || !real.length) return
        setPosts(real)
        setIsLive(true)
      })
      .catch((err) => {
        console.warn('[Herin] No se pudo cargar el feed de Instagram:', err.message)
      })

    return () => {
      alive = false
    }
  }, [])

  return { posts, isLive }
}

/**
 * Cada recuadro va en 4:5 vertical, el formato nativo de una publicación de
 * Instagram: así las fotos se recortan lo mínimo y la grilla se parece a la
 * del perfil.
 */
function PostTile({ post, index }) {
  const ref = useReveal()
  return (
    <a
      ref={ref}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group relative aspect-[4/5] overflow-hidden rounded-xl bg-cream"
      style={{
        transitionDelay: `${index * 0.06}s`,
        // Color dominante de la foto: evita el parpadeo gris mientras carga
        backgroundColor: post.placeholder ?? undefined,
      }}
      aria-label={`Ver en Instagram: ${post.alt}`}
    >
      <img
        src={post.image}
        alt={post.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
      />

      {post.isVideo && (
        <span className="absolute top-2 right-2 text-paper drop-shadow-md">
          <Play size={14} fill="currentColor" />
        </span>
      )}

      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center">
        <InstagramIcon
          size={22}
          className="text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </a>
  )
}
