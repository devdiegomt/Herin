import { contact, site, store } from '../config/site'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

/**
 * /links — página tipo Linktree, a la que apunta el QR impreso.
 *
 * El QR lleva a herinoficial.vercel.app/links (no a linktr.ee), así que si
 * mañana cambia el WhatsApp o se agrega un botón, se edita acá o en
 * src/config/site.js y el QR impreso sigue sirviendo.
 */

const links = [
  {
    label: 'Ver catálogo',
    hint: 'Materas y velas disponibles',
    href: '/',
    external: false,
    icon: (
      <path d="M3 9.5 12 4l9 5.5M5 10v10h14V10M9.5 20v-6h5v6" />
    ),
  },
  {
    label: 'Escríbenos por WhatsApp',
    hint: 'Pedidos y preguntas',
    href: getWhatsAppGeneralLink(),
    external: true,
    icon: (
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Zm5-11c0 3.3 2.7 6 6 6l1.2-1.3-2-1-1 .8a4 4 0 0 1-2.7-2.7l.8-1-1-2L9 9Z" />
    ),
  },
  {
    label: 'Síguenos en Instagram',
    hint: `@${contact.instagram}`,
    href: `https://instagram.com/${contact.instagram}`,
    external: true,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </>
    ),
  },
]

export default function Links() {
  return (
    <main className="min-h-dvh bg-cream-light flex flex-col items-center px-5 py-14">
      <img
        src="/images/logo/logo.jpg"
        alt={site.name}
        width="112"
        height="112"
        className="w-28 h-28 rounded-full ring-1 ring-line shadow-sm"
      />

      {/* El logo ya dice HERIN: el h1 queda solo para lectores de pantalla */}
      <h1 className="sr-only">{site.name}</h1>
      <p className="mt-5 font-display text-2xl text-moss">{site.tagline}</p>

      <ul className="mt-10 w-full max-w-sm space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group flex items-center gap-4 rounded-2xl bg-paper border border-line px-5 py-4
                         transition hover:border-terracotta hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-cream text-moss
                               group-hover:bg-terracotta group-hover:text-paper transition">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                     stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                  {l.icon}
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-charcoal">{l.label}</span>
                <span className="text-sm text-warm-gray">{l.hint}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-14 text-center text-sm text-warm-gray">
        <p>{store.name} · {store.address}</p>
        <p>{store.schedule}</p>
      </footer>
    </main>
  )
}
