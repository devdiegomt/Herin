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
  url: 'https://herin.vercel.app',
}

export const contact = {
  // Formato internacional sin + ni espacios (57 = Colombia)
  whatsapp: '573143347357',
  email: null, // 'hola@herin.co' cuando exista
  instagram: 'herin_oficial',
}

export const store = {
  name: 'Miscelánea Ave María',
  address: 'Carrera 14 #15-29, Zipaquirá',
  schedule: 'Lunes a Domingo · 10:00 a.m. – 7:00 p.m.',
  // Link corto de Google Maps (el que se comparte desde la app)
  mapsLink: 'https://maps.app.goo.gl/M1cREG85tw9rXPA79',
}

// Query para el iframe de Google Maps. No requiere API key.
export const mapQuery = `${store.name}, ${store.address}, Cundinamarca`
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

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
