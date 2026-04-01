import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import About from './components/About'
import Benefits from './components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="font-body antialiased">
      <Navbar />
      <Hero />
      <ProductList />
      <About />
      <Benefits />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
