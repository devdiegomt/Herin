import { useState } from 'react'
import { products, categories } from '../data/products'
import ProductCard from './ProductCard'
import { useReveal } from '../hooks/useReveal'

export default function ProductList() {
  const [active, setActive] = useState('all')
  const ref = useReveal()

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active)

  return (
    <section id="productos" className="py-20 sm:py-28 bg-cream-light noise-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div ref={ref} className="reveal text-center mb-12 sm:mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
            Catálogo
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            Nuestras <span className="italic font-normal">creaciones</span>
          </h2>
          <p className="font-body text-warm-gray max-w-lg mx-auto">
            Cada pieza es moldeada, pintada y cuidada a mano. Encuentra la que hable con tu espacio.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                active === cat.id
                  ? 'bg-charcoal text-cream-light shadow-md'
                  : 'bg-sand/50 text-warm-gray hover:bg-sand hover:text-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
