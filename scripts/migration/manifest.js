/**
 * Manifiesto de productos para la migración inicial de Herin.
 *
 * Cada producto tiene:
 *   - name, category (slug: 'materas' | 'velas'), price (número, en pesos)
 *   - description       → corta, se ve en la tarjeta del catálogo
 *   - description_long  → ampliada, se ve en la vista de detalle
 *   - tag               → "Edición limitada", etc., o null
 *   - images            → rutas locales (relativas a public/), la 1ª es la principal
 *
 * Puedes editar libremente nombres, precios y descripciones aquí antes de correr
 * la migración. Para dar a un producto VARIAS fotos, agrega más rutas al array
 * images (la galería las mostrará en ese orden).
 */

export const productManifest = [
  // ===== MATERAS =====
  {
    name: 'Matera elefante azul',
    category: 'materas',
    price: 5000,
    description: 'Elefante minimalista azul, matera decorativa moderna.',
    description_long:
      'Matera con figura de elefante en tono azul, de líneas limpias y minimalistas. ' +
      'Moldeada y pintada a mano, ideal para suculentas o plantas pequeñas que le den ' +
      'un toque tierno y moderno a cualquier rincón.',
    tag: null,
    images: ['images/products/flowerpots/matera1.webp'],
  },
  {
    name: 'Matera geométrica crema',
    category: 'materas',
    price: 4000,
    description: 'Matera geométrica blanca, estilo limpio y elegante.',
    description_long:
      'Matera de diseño geométrico en color crema, con un acabado sobrio y elegante. ' +
      'Su forma de facetas le da un aire contemporáneo que combina con espacios ' +
      'modernos y neutros.',
    tag: null,
    images: ['images/products/flowerpots/matera2.webp'],
  },
  {
    name: 'Matera en forma de canasta',
    category: 'materas',
    price: 4800,
    description: 'Matera artesanal beige con textura de canasta.',
    description_long:
      'Matera artesanal en tono beige que imita el tejido de una canasta. ' +
      'Aporta calidez y un toque rústico, perfecta para suculentas o cactus ' +
      'pequeños que resalten su textura.',
    tag: null,
    images: ['images/products/flowerpots/matera3.webp'],
  },
  {
    name: 'Matera en forma de jarrón',
    category: 'materas',
    price: 7000,
    description: 'Matera rústica con forma de jarrón.',
    description_long:
      'Matera con silueta de jarrón y acabado rústico, pensada para destacar como ' +
      'pieza decorativa. Su altura la hace ideal para plantas con caída o follaje ' +
      'que busque protagonismo.',
    tag: null,
    images: ['images/products/flowerpots/matera4.webp'],
  },
  {
    name: 'Matera circular',
    category: 'materas',
    price: 4800,
    description: 'Matera redonda blanca, sencilla y versátil.',
    description_long:
      'Matera redonda en color blanco, de diseño sencillo y versátil. Su forma ' +
      'compacta la hace perfecta para una suculenta central y se adapta a ' +
      'cualquier estilo de decoración.',
    tag: null,
    images: ['images/products/flowerpots/matera5.webp'],
  },
  {
    name: 'Matera elefante blanca',
    category: 'materas',
    price: 6800,
    description: 'Matera elefante blanca, diseño creativo decorativo.',
    description_long:
      'Matera con figura de elefante en color blanco, de diseño creativo y ' +
      'decorativo. Pintada a mano, es una pieza llamativa que funciona como ' +
      'detalle y como hogar para tus plantas pequeñas.',
    tag: null,
    images: ['images/products/flowerpots/matera7.webp'],
  },
  {
    name: 'Matera hexagonal pequeña',
    category: 'materas',
    price: 3800,
    description: 'Matera hexagonal blanca, compacta y moderna.',
    description_long:
      'Matera hexagonal en color blanco, de tamaño compacto y estilo moderno. ' +
      'Sus caras geométricas le dan personalidad sin perder sencillez, ideal ' +
      'para una suculenta pequeña en escritorios o repisas.',
    tag: null,
    images: ['images/products/flowerpots/matera8.webp'],
  },
  {
    name: 'Matera grande Bonsai',
    category: 'materas',
    price: 18000,
    description: 'Matera grande con diseño geométrico, para plantas de mayor tamaño.',
    description_long:
      'Matera grande con diseño geométrico, pensada para plantas de mayor tamaño ' +
      'como bonsáis o suculentas frondosas. Su amplitud da espacio a las raíces y ' +
      'su acabado a mano hace de cada pieza algo único.',
    tag: null,
    images: ['images/products/flowerpots/matera11.webp'],
  },

  // ===== VELAS =====
  {
    name: 'Vela Conejita',
    category: 'velas',
    price: 5500,
    description: 'Vela verde tierna con figura de conejita.',
    description_long:
      'Vela en tono verde con forma de conejita sonriente, un detalle tierno y ' +
      'decorativo. Hecha a mano, ilumina con calidez y queda preciosa como regalo ' +
      'o como pieza de adorno.',
    tag: null,
    images: ['images/products/candles/vela1.webp'],
  },
  {
    name: 'Vela corazones pastel',
    category: 'velas',
    price: 6800,
    description: 'Vela en frasco con corazones en tonos pastel.',
    description_long:
      'Vela presentada en frasco, decorada con corazones en suaves tonos pastel. ' +
      'Romántica y delicada, es ideal para ambientar espacios o sorprender en ' +
      'una ocasión especial.',
    tag: null,
    images: ['images/products/candles/vela2.webp'],
  },
  {
    name: 'Vela colores con tapa de corcho',
    category: 'velas',
    price: 5800,
    description: 'Vela degradada en frasco con tapa de corcho.',
    description_long:
      'Vela con degradado de color en frasco de vidrio y tapa de corcho. La mezcla ' +
      'de tonos le da un aire artesanal y cálido, perfecta para decorar y aromatizar ' +
      'tu espacio.',
    tag: null,
    images: ['images/products/candles/vela3.webp'],
  },
  {
    name: 'Vela Angelito verde',
    category: 'velas',
    price: 4500,
    description: 'Vela escultórica verde con forma de angelito.',
    description_long:
      'Vela escultórica en tono verde con forma de angelito, pensada como pieza ' +
      'artística y decorativa. Una edición limitada hecha a mano, perfecta para ' +
      'regalar o coleccionar.',
    tag: 'Edición limitada',
    images: ['images/products/candles/vela7.webp'],
  },
  {
    name: 'Vela conejito azul',
    category: 'velas',
    price: 5500,
    description: 'Vela azul con figura de conejito adorable.',
    description_long:
      'Vela en color azul con forma de conejito, un detalle adorable y lleno de ' +
      'ternura. Hecha a mano, funciona como regalo original o como decoración ' +
      'que alegra cualquier rincón.',
    tag: null,
    images: ['images/products/candles/vela12.webp'],
  },
  {
    name: 'Vela Osito verde',
    category: 'velas',
    price: 3000,
    description: 'Vela verde estilo regalo con forma de osito.',
    description_long:
      'Vela en tono verde con forma de osito, presentada con un estilo de regalo ' +
      'creativo. Pequeña y encantadora, es perfecta como detalle para sorprender.',
    tag: null,
    images: ['images/products/candles/vela13.webp'],
  },
  {
    name: 'Vela perro blanca',
    category: 'velas',
    price: 10500,
    description: 'Vela blanca con forma de perrito, estilo regalo.',
    description_long:
      'Vela en color blanco con forma de perrito, elaborada con detalle como pieza ' +
      'de regalo. Su tamaño y acabado la hacen una opción especial para los amantes ' +
      'de las mascotas.',
    tag: null,
    images: ['images/products/candles/vela14.webp'],
  },
]
