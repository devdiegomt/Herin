import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import InstagramIcon from './icons/InstagramIcon'
import { contact, instagramUrl } from '../config/site'

const IG_HANDLE = contact.instagram
const IG_PROFILE = instagramUrl

/**
 * Selección curada de publicaciones. NO es un feed automático: Instagram no
 * deja leer las publicaciones de una cuenta sin pasar por su API, que exige
 * cuenta de empresa, una app de Meta y un token que hay que renovar.
 *
 * Mientras tanto, esto se actualiza a mano cuando quieras rotar el contenido:
 *
 *   image → la foto. Puede ser una ruta local (guárdala en
 *           public/images/instagram/) o una URL. Usa formato cuadrado (1:1)
 *           para que la grilla quede pareja.
 *   href  → el enlace a la publicación real. Ábrela en Instagram, copia la
 *           URL de la barra del navegador y pégala aquí. Si la dejas apuntando
 *           a IG_PROFILE, el clic lleva al perfil en vez de a la publicación.
 *   alt   → qué se ve en la foto (para lectores de pantalla y buscadores).
 */
const posts = [
  { image: '/images/products/flowerpots/matera1.webp', href: IG_PROFILE, alt: 'Matera artesanal Herin' },
  { image: '/images/products/candles/vela1.webp',      href: IG_PROFILE, alt: 'Vela artesanal Herin' },
  { image: '/images/products/flowerpots/matera2.webp', href: IG_PROFILE, alt: 'Colección de materas' },
  { image: '/images/products/flowerpots/matera6.webp', href: IG_PROFILE, alt: 'Detalles de matera' },
  { image: '/images/products/candles/vela7.webp',      href: IG_PROFILE, alt: 'Velas aromáticas' },
  { image: '/images/products/flowerpots/matera7.webp', href: IG_PROFILE, alt: 'Piezas nuevas' },
]

export default function InstagramFeed() {
  const refHeader = useReveal()

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
              Encuéntranos en
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
            <PostTile key={i} post={post} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center font-body text-xs text-warm-gray/70 mt-8 tracking-wide">
          Publicamos piezas nuevas e historias del taller en Instagram
        </p>
      </div>
    </section>
  )
}

function PostTile({ post, index }) {
  const ref = useReveal()
  return (
    <a
      ref={ref}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group relative aspect-square overflow-hidden rounded-xl bg-sand"
      style={{ transitionDelay: `${index * 0.06}s` }}
      aria-label={`Ver post en Instagram: ${post.alt}`}
    >
      <img
        src={post.image}
        alt={post.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center">
        <InstagramIcon
          size={22}
          className="text-cream-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </a>
  )
}