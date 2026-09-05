import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import QueHacemos from '../components/QueHacemos'
import Diferencial from '../components/Diferencial'
import PuntoFisico from '../components/PuntoFisico'
import InstagramFeed from '../components/InstagramFeed'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

/**
 * Orden pensado para tráfico de Instagram: el catálogo va apenas debajo del
 * hero, antes que cualquier sección de marca.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductList />
        <QueHacemos />
        <Diferencial />
        <PuntoFisico />
        <InstagramFeed />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
