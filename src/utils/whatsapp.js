import { WHATSAPP_NUMBER } from '../data/products'

/**
 * Genera un link de WhatsApp con mensaje prellenado
 * @param {string} productName - Nombre del producto
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppLink(productName = '') {
  const message = productName
    ? `¡Hola! 🌿 Me interesa el producto "${productName}" de Herin. ¿Podrían darme más información?`
    : '¡Hola! 🌿 Me gustaría conocer más sobre los productos de Herin.'

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Genera link de WhatsApp para compra general
 * @returns {string} URL de WhatsApp
 */
export function getWhatsAppGeneralLink() {
  const message = '¡Hola! 🌿 Quiero hacer un pedido en Herin. ¿Me pueden ayudar?'
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
