import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-5 pt-24 pb-20 bg-cream-light">
        <div className="text-center max-w-md">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-4">
            Error 404
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
            Esta página no existe
          </h1>
          <p className="font-body text-warm-gray mb-8 leading-relaxed">
            Puede que el enlace esté roto o que la pieza ya no esté disponible.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-charcoal hover:bg-charcoal/85 text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors"
          >
            Ver el catálogo
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
