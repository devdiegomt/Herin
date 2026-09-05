import { contact } from '../config/site'

/**
 * Links de WhatsApp con mensaje prellenado.
 * El número vive en src/config/site.js
 */

// Consulta sobre un producto concreto (desde la tarjeta o el detalle).
export function getWhatsAppLink(productName = '', price = '') {
  const message = productName
    ? `¡Hola! 🌿 Me interesa "${productName}"${price ? ` (${price})` : ''} de Herin. ¿Me pueden dar más información?`
    : '¡Hola! 🌿 Me gustaría conocer más sobre los productos de Herin.'

  return buildLink(message)
}

// Consulta general (botón flotante, hero, CTA).
export function getWhatsAppGeneralLink() {
  return buildLink('¡Hola! 🌿 Quiero hacer un pedido en Herin. ¿Me pueden ayudar?')
}

function buildLink(message) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}
