import { MessageCircle } from 'lucide-react'
import { getWhatsAppGeneralLink } from '../utils/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 animate-fade-up animation-delay-500"
    >
      <MessageCircle size={26} fill="white" />

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  )
}
