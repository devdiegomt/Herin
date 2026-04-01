import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref1 = useReveal()
  const ref2 = useReveal()

  return (
    <section id="nosotros" className="py-20 sm:py-28 bg-sand/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image collage */}
          <div ref={ref1} className="reveal relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1602607079888-67c3e93efce6?w=400&h=500&fit=crop"
                  alt="Vela artesanal Herin"
                  className="rounded-2xl w-full object-cover aspect-[3/4] shadow-md"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
                  alt="Suculenta en matera artesanal"
                  className="rounded-2xl w-full object-cover aspect-[4/3] shadow-md"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop"
                  alt="Plantas decorativas"
                  className="rounded-2xl w-full object-cover aspect-[4/3] shadow-md"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=400&h=500&fit=crop"
                  alt="Taller artesanal"
                  className="rounded-2xl w-full object-cover aspect-[3/4] shadow-md"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-terracotta/10 rounded-full blur-2xl" />
          </div>

          {/* Text content */}
          <div ref={ref2} className="reveal">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-terracotta mb-3">
              Nuestra historia
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6 leading-tight">
              Hecho a mano,
              <br />
              <span className="italic font-normal">hecho con alma</span>
            </h2>

            <div className="space-y-4 font-body text-warm-gray leading-relaxed">
              <p>
                Herin nació del amor por lo artesanal y la belleza de las cosas simples. 
                Desde Zipaquirá, Colombia, creamos piezas que llevan la calidez de lo hecho a mano 
                a cada rincón de tu hogar.
              </p>
              <p>
                Nuestras materas son moldeadas con cemento y marmolina, cada una con texturas 
                y acabados que las hacen irrepetibles. Las velas son elaboradas con cera de soja 
                natural, aromas cuidadosamente seleccionados y figuras tiernas pintadas a mano.
              </p>
              <p>
                Cada producto es una pieza de arte que refleja nuestra pasión por la naturaleza, 
                el diseño consciente y la dedicación artesanal. Porque creemos que los detalles 
                pequeños transforman los espacios grandes.
              </p>
            </div>

            {/* Signature detail */}
            <div className="mt-8 pt-8 border-t border-sand">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-moss/15 flex items-center justify-center">
                  <span className="font-display text-lg text-moss font-semibold">H</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-charcoal">Herin</p>
                  <p className="font-body text-sm text-warm-gray">Zipaquirá, Colombia 🇨🇴</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
