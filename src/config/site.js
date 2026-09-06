/**
 * Configuración central de Herin.
 *
 * Todo lo que un no-programador podría necesitar cambiar (teléfono, dirección,
 * redes, horario) vive acá y en ningún otro lado. Si cambia el WhatsApp, se
 * cambia una sola línea.
 */

export const site = {
  name: 'Herin',
  tagline: 'Materas y velas artesanales',
  city: 'Zipaquirá, Cundinamarca',
  url: 'https://herinoficial.vercel.app',
}

export const contact = {
  // Formato internacional sin + ni espacios (57 = Colombia)
  whatsapp: '573143347357',
  email: null, // 'hola@herin.co' cuando exista
  instagram: 'herin_oficial',

  /**
   * Feed JSON de Behold (behold.so) con las publicaciones reales de Instagram.
   *
   * El navegador NO pide esta URL directamente: pasa por /api/instagram, que
   * la cachea (ver instagramFeedPath abajo). Aquí queda la fuente original,
   * que es lo único que hay que cambiar si algún día se rehace el feed.
   *
   * Si la pones en null, la sección vuelve a las fotos elegidas a mano que
   * están en src/components/InstagramFeed.jsx.
   */
  instagramSourceUrl: 'https://feeds.behold.so/ANfpAQFVeComjZDkoZLM',

  /**
   * Lo que pide el navegador. Es nuestra propia función, no Behold.
   *
   * POR QUÉ: el plan gratuito de Behold permite 1.200 lecturas al mes. Si cada
   * visitante leyera el feed directamente, una buena racha de tráfico desde
   * Instagram lo agotaría y la sección se caería al respaldo. Con la función
   * de por medio, el CDN responde a casi todo el mundo y a Behold solo le
   * llegan unas pocas lecturas por día, sin importar cuánta gente entre.
   *
   * En desarrollo, vite.config.js redirige esta ruta al feed real.
   */
  instagramFeedPath: '/api/instagram',
}

export const store = {
  name: 'Miscelánea Ave María',
  address: 'Carrera 14 #15-29, Zipaquirá',
  schedule: 'Lunes a Domingo · 10:00 a.m. – 7:00 p.m.',

  /**
   * Coordenadas exactas del local.
   *
   * Buscar por dirección no siempre acierta: Google interpreta la nomenclatura
   * y a veces deja el pin a media cuadra. Con las coordenadas el pin cae donde
   * es, siempre.
   *
   * CÓMO SACARLAS (2 minutos):
   *   1. Abre Google Maps y ubica el local en el mapa.
   *   2. Haz clic derecho justo encima de la puerta (en el celular: mantén
   *      pulsado hasta que salga el pin rojo).
   *   3. Arriba del menú aparecen dos números, algo como  5,022451, -74,004312
   *      Haz clic en ellos: se copian solos.
   *   4. Pégalos aquí abajo cambiando las comas decimales por puntos:
   *        lat: 5.022451,
   *        lng: -74.004312,
   *
   * Si lo dejas en null, el mapa vuelve a buscar por dirección (menos exacto).
   */
  coords: null, // { lat: 5.0224, lng: -74.0043 }

  // Link corto de Google Maps (el que se comparte desde la app)
  mapsLink: 'https://maps.app.goo.gl/M1cREG85tw9rXPA79',
}

// Query para el iframe de Google Maps. No requiere API key.
export const mapQuery = `${store.name}, ${store.address}, Cundinamarca`

// Con coordenadas el pin cae exacto; sin ellas, se busca por dirección.
export const mapEmbedSrc = store.coords
  ? `https://www.google.com/maps?q=${store.coords.lat},${store.coords.lng}&z=18&output=embed`
  : `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

// "Cómo llegar": abre la navegación paso a paso hacia el punto exacto.
export const directionsLink = store.coords
  ? `https://www.google.com/maps/dir/?api=1&destination=${store.coords.lat},${store.coords.lng}`
  : store.mapsLink

export const instagramUrl = `https://instagram.com/${contact.instagram}`

/**
 * Secciones de la página, en orden. Es la única fuente de verdad para el
 * navbar, el footer y los anchors.
 */
export const sections = [
  { id: 'productos', label: 'Catálogo' },
  { id: 'que-hacemos', label: 'Qué hacemos' },
  { id: 'diferencial', label: 'Por qué Herin' },
  { id: 'ubicacion', label: 'Dónde estamos' },
  { id: 'instagram', label: 'Instagram' },
]
