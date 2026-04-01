import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          viewBox="0 0 1360 960"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1360" height="960" fill="#2D2A26" />
          <rect x="0" y="640" width="1360" height="320" fill="#3A3530" />
          <ellipse cx="680" cy="680" rx="760" ry="60" fill="#3A3530" />
          <circle cx="1160" cy="160" r="100" fill="#C47D5A" opacity="0.12" />
          <circle cx="1200" cy="140" r="70" fill="#D4A89A" opacity="0.1" />
          <circle cx="200" cy="120" r="50" fill="#4A5D3A" opacity="0.15" />
          <circle cx="120" cy="180" r="30" fill="#6B7F5A" opacity="0.12" />
          <g>
            <path
              d="M160 680 Q160 520 190 480 Q220 440 210 400 Q200 360 230 320 Q260 280 240 240 L250 236 Q280 276 260 316 Q240 356 250 396 Q260 436 230 476 Q200 516 200 680Z"
              fill="#4A5D3A"
              opacity="0.5"
            />
            <path
              d="M100 680 Q110 600 120 560 Q130 520 110 480 Q90 440 120 400 L136 408 Q110 444 130 484 Q150 524 140 564 Q130 604 124 680Z"
              fill="#6B7F5A"
              opacity="0.4"
            />
          </g>
          <g>
            <rect
              x="200"
              y="540"
              width="180"
              height="190"
              rx="12"
              fill="#A8917A"
            />
            <rect
              x="208"
              y="548"
              width="164"
              height="174"
              rx="8"
              fill="#BFA98F"
            />
            <path
              d="M290 540 Q280 500 260 480 Q240 450 250 420 Q260 390 240 360 L256 356 Q276 386 266 416 Q256 446 276 476 Q296 506 300 540Z"
              fill="#4A5D3A"
            />
            <path
              d="M290 540 Q300 496 320 470 Q340 444 330 410 L344 406 Q356 440 336 466 Q316 492 306 540Z"
              fill="#6B7F5A"
            />
            <path
              d="M290 540 Q276 510 256 500 Q236 490 230 460 L244 456 Q250 486 270 496 Q290 506 300 540Z"
              fill="#3D7A4A"
            />
            <ellipse
              cx="290"
              cy="544"
              rx="56"
              ry="12"
              fill="#5C7A4A"
              opacity="0.6"
            />
            <circle cx="270" cy="490" r="8" fill="#A8B89A" opacity="0.5" />
            <circle cx="316" cy="450" r="6" fill="#A8B89A" opacity="0.4" />
          </g>
          <g>
            <path
              d="M480 680 L480 560 Q480 530 510 530 L550 530 Q580 530 580 560 L580 680Z"
              fill="#C47D5A"
            />
            <rect
              x="470"
              y="520"
              width="120"
              height="24"
              rx="6"
              fill="#A8633F"
            />
            <ellipse
              cx="530"
              cy="524"
              rx="50"
              ry="10"
              fill="#D4A89A"
              opacity="0.4"
            />
            <path
              d="M516 516 Q512 480 520 450 Q528 420 516 390 L528 386 Q540 416 532 446 Q524 476 528 516Z"
              fill="#4A5D3A"
            />
            <path
              d="M536 516 Q544 484 560 464 Q576 444 570 416 L582 412 Q588 440 572 460 Q556 480 548 516Z"
              fill="#6B7F5A"
            />
            <path
              d="M520 516 Q508 490 496 480 L508 472 Q520 482 532 516Z"
              fill="#3D7A4A"
              opacity="0.8"
            />
          </g>
          <g>
            <rect
              x="700"
              y="560"
              width="140"
              height="170"
              rx="16"
              fill="#8C8278"
            />
            <rect
              x="708"
              y="568"
              width="124"
              height="154"
              rx="12"
              fill="#9E938A"
            />
            <rect
              x="708"
              y="568"
              width="124"
              height="40"
              rx="12"
              fill="#E8DFD0"
              opacity="0.3"
            />
            <path
              d="M740 620 Q736 600 744 584 Q752 568 744 552 L754 548 Q762 564 754 580 Q746 596 750 620Z"
              fill="#4A5D3A"
              opacity="0.8"
            />
            <path
              d="M770 620 Q780 596 792 580 Q800 568 796 552 L806 548 Q810 564 802 576 Q790 592 780 620Z"
              fill="#6B7F5A"
              opacity="0.7"
            />
            <path
              d="M756 620 Q752 604 760 592 L770 596 Q762 608 764 620Z"
              fill="#3D7A4A"
              opacity="0.6"
            />
            <ellipse
              cx="770"
              cy="624"
              rx="40"
              ry="10"
              fill="#5C7A4A"
              opacity="0.5"
            />
          </g>
          <g>
            <ellipse cx="960" cy="685" rx="50" ry="12" fill="#3A3530" />
            <rect
              x="930"
              y="560"
              width="60"
              height="130"
              rx="16"
              fill="#D4A89A"
            />
            <rect
              x="936"
              y="566"
              width="48"
              height="118"
              rx="12"
              fill="#E2C4B6"
            />
            <path
              d="M956 566 Q952 548 960 532 Q968 516 964 500 L972 496 Q976 512 968 528 Q960 544 964 566Z"
              fill="#F5F0E8"
              opacity="0.35"
            />
            <rect
              x="957"
              y="536"
              width="6"
              height="32"
              rx="3"
              fill="#FFDC8E"
              opacity="0.9"
            />
            <ellipse
              cx="960"
              cy="536"
              rx="16"
              ry="8"
              fill="#FFB347"
              opacity="0.25"
            />
            <ellipse
              cx="960"
              cy="530"
              rx="10"
              ry="12"
              fill="#FF9F1C"
              opacity="0.15"
            />
            <line
              x1="960"
              y1="536"
              x2="960"
              y2="512"
              stroke="#FFDC8E"
              stroke-width="2"
              opacity="0.6"
            />
            <circle cx="960" cy="508" r="6" fill="#FFB347" opacity="0.4" />
            <circle cx="960" cy="502" r="4" fill="#FF9F1C" opacity="0.2" />
            <circle cx="946" cy="610" r="5" fill="#C9A898" opacity="0.4" />
            <circle cx="970" cy="624" r="4" fill="#C9A898" opacity="0.3" />
            <circle cx="950" cy="640" r="3.5" fill="#C9A898" opacity="0.25" />
          </g>
          <g>
            <ellipse cx="1080" cy="692" rx="35" ry="8" fill="#3A3530" />
            <rect
              x="1055"
              y="620"
              width="50"
              height="76"
              rx="14"
              fill="#E8DFD0"
            />
            <rect
              x="1060"
              y="625"
              width="40"
              height="66"
              rx="10"
              fill="#F0E6D8"
            />
            <rect
              x="1077"
              y="608"
              width="6"
              height="18"
              rx="3"
              fill="#FFDC8E"
              opacity="0.8"
            />
            <line
              x1="1080"
              y1="608"
              x2="1080"
              y2="596"
              stroke="#FFDC8E"
              stroke-width="1.5"
              opacity="0.5"
            />
            <circle cx="1080" cy="592" r="4" fill="#FFB347" opacity="0.3" />
            <circle cx="1072" cy="650" r="3" fill="#DDD2C4" opacity="0.5" />
          </g>
          <g>
            <ellipse cx="1180" cy="696" rx="35" ry="8" fill="#3A3530" />
            <rect
              x="1155"
              y="645"
              width="50"
              height="55"
              rx="8"
              fill="#9E938A"
            />
            <rect
              x="1160"
              y="650"
              width="40"
              height="45"
              rx="6"
              fill="#B5A99C"
            />
            <path
              d="M1180 645 Q1176 630 1184 618 L1192 622 Q1184 634 1188 645Z"
              fill="#4A5D3A"
              opacity="0.7"
            />
            <path
              d="M1172 645 Q1164 624 1172 612 L1180 616 Q1172 628 1180 645Z"
              fill="#6B7F5A"
              opacity="0.6"
            />
            <ellipse
              cx="1180"
              cy="648"
              rx="16"
              ry="4"
              fill="#5C7A4A"
              opacity="0.4"
            />
          </g>
          <circle cx="600" cy="200" r="3" fill="#F5F0E8" opacity="0.15" />
          <circle cx="900" cy="120" r="2.5" fill="#F5F0E8" opacity="0.12" />
          <circle cx="1040" cy="260" r="2.5" fill="#F5F0E8" opacity="0.1" />
          <circle cx="360" cy="280" r="3" fill="#F5F0E8" opacity="0.1" />
          <circle cx="800" cy="180" r="2" fill="#F5F0E8" opacity="0.12" />
          <circle cx="500" cy="110" r="2.5" fill="#F5F0E8" opacity="0.08" />
          <circle cx="300" cy="200" r="2" fill="#F5F0E8" opacity="0.1" />
          <circle cx="1100" cy="100" r="2" fill="#F5F0E8" opacity="0.08" />
          <circle cx="750" cy="100" r="1.5" fill="#F5F0E8" opacity="0.1" />

          <g opacity="0.7">
            <line
              x1="560"
              y1="468"
              x2="800"
              y2="468"
              stroke="#C47D5A"
              stroke-width="1"
            />
            <circle
              cx="680"
              cy="468"
              r="5"
              fill="none"
              stroke="#C47D5A"
              stroke-width="1"
            />
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/35 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-20">
        {/* Tagline */}
        <p className="animate-fade-up font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-sand/90 mb-6">
          Artesanía · Naturaleza · Hogar
        </p>

        {/* Main heading */}
        <h1 className="animate-fade-up animation-delay-100 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-cream-light leading-[1.1] mb-6 sm:mb-8">
          Arte que da vida
          <br />
          <span className="italic font-normal text-blush">a tus espacios</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up animation-delay-200 font-body text-base sm:text-lg text-cream/80 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          Materas y velas artesanales hechas a mano con amor.
          <br className="hidden sm:block" />
          Cada pieza es única, como tu hogar.
        </p>

        {/* CTA */}
        <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#productos"
            className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/20 hover:-translate-y-0.5"
          >
            Ver catálogo
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center justify-center gap-2 border border-cream-light/40 hover:border-cream-light/70 text-cream-light px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-cream-light/10"
          >
            Conoce Herin
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#productos" aria-label="Ir al catálogo">
          <ArrowDown className="text-cream-light/60" size={20} />
        </a>
      </div>
    </section>
  );
}
