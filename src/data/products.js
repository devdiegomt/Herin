/**
 * Datos de productos HERIN
 * 
 * Para actualizar:
 * - Cambia las URLs de imagen por las reales de tus productos
 * - Modifica nombres, descripciones y precios según tu catálogo
 * - Usa imágenes cuadradas (1:1) o 4:5 para mejor presentación
 */

export const WHATSAPP_NUMBER = '573143347357' // ← Cambia por el número real de HERIN

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'materas', label: 'Materas' },
  { id: 'velas', label: 'Velas' },
]

export const products = [
  // === MATERAS ===
  {
    id: 1,
    name: 'Elefante sin mata',
    category: 'materas',
    description: 'Elefante minimalista azul, matera decorativa moderna.',
    price: '5.000',
    image: '/images/products/flowerpots/matera1.webp',
    tag: null,
  },
  {
    id: 2,
    name: 'Geométrica sin mata',
    category: 'materas',
    description: 'Matera geométrica blanca, estilo limpio y elegante.',
    price: '4.000',
    image: '/images/products/flowerpots/matera2.webp',
    tag: null,
  },
  {
    id: 3,
    name: 'Canasta',
    category: 'materas',
    description: 'Matera artesanal beige con suculenta pequeña.',
    price: '4.800',
    image: '/images/products/flowerpots/matera3.webp',
    tag: null,
  },
  {
    id: 4,
    name: 'Jarrón',
    category: 'materas',
    description: 'Matera rústica con planta.',
    price: '7.000',
    image: '/images/products/flowerpots/matera4.webp',
    tag: null,
  },
  {
    id: 5,
    name: 'Circular',
    category: 'materas',
    description: 'Matera redonda blanca con suculenta central.',
    price: '4.800',
    image: '/images/products/flowerpots/matera5.webp',
    tag: null,
  },
  /* {
    id: 6,
    name: 'Matera6', CAMBIAR POR NOMBRE REAL
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.', CAMBIAR POR DESCRIPCIÓN REAL
    price: '68.000', CAMBIAR POR PRECIO REAL
    image: '/images/products/flowerpots/matera6.webp',
    tag: 'Edición limitada', CAMBIAR POR ETIQUETA REAL O NULL SI NO APLICA 
  }, */
  {
    id: 7,
    name: 'Elefante',
    category: 'materas',
    description: 'Matera elefante blanca, diseño creativo decorativo.',
    price: '6.800',
    image: '/images/products/flowerpots/matera7.webp',
    tag: null,
  },
  {
    id: 8,
    name: 'Pequeña',
    category: 'materas',
    description: 'Matera hexagonal blanca con suculenta compacta.',
    price: '3.800',
    image: '/images/products/flowerpots/matera8.webp',
    tag: null,
  },
/*   {
PENDIENTE AGREGAR Y MODIFICAR
    id: 9,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/flowerpots/matera9.webp',
    tag: 'Edición limitada',
  }, */
  /* {
  MISMA NÚMERO 8, MODIFICAR
    id: 10,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/flowerpots/matera10.webp',
    tag: 'Edición limitada',
  }, */

  // === VELAS ===

  {
    id: 11,
    name: 'Coneja',
    category: 'velas',
    description: 'Vela verde tierna con figura sonriente decorativa.',
    price: '68.000',
    image: '/images/products/candles/vela1.webp',
    tag: null,
  },
  {
    id: 12,
    name: 'Colores (frasco vidrio)',
    category: 'velas',
    description: 'Vela en frasco con corazones color pastel.',
    price: '68.000',
    image: '/images/products/candles/vela2.webp',
    tag: null,
  },
  {
    id: 13,
    name: 'Colores - tapa corcho',
    category: 'velas',
    description: 'Vela degradada rojo y blanco en frasco.',
    price: '68.000',
    image: '/images/products/candles/vela3.webp',
    tag: null,
  },
/*
  PENDIENTE MODIFICAR O HACER CARRUSEL DE VARIANTES
  {
    id: 14,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela4.webp',
    tag: 'Edición limitada',
  },
  {
    id: 15,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela5.webp',
    tag: 'Edición limitada',
  },
  {
    id: 16,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela6.webp',
    tag: 'Edición limitada',
  }, */
  {
    id: 17,
    name: 'Angelito',
    category: 'velas',
    description: 'Vela escultórica blanca con forma artística.',
    price: '68.000',
    image: '/images/products/candles/vela7.webp',
    tag: 'Edición limitada',
  },
  /*
    MISMO COMENTARIO QUE EL ANTERIOR
  {
    id: 18,
    name: 'Angelito',
    category: 'velas',
    description: 'Vela escultórica blanca con forma artística.',
    price: '4.500',
    image: '/images/products/candles/vela8.webp',
    tag: 'Edición limitada',
  },
  {
    id: 19,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela9.webp',
    tag: 'Edición limitada',
  },
  {
    id: 20,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela10.webp',
    tag: 'Edición limitada',
  },
  {
    id: 21,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela11.webp',
    tag: 'Edición limitada',
  },*/
  {
    id: 22,
    name: 'Conejito azul',
    category: 'velas',
    description: 'Vela azul con figura de conejo adorable.',
    price: '5.500',
    image: '/images/products/candles/vela12.webp',
    tag: null,
  },
  {
    id: 23,
    name: 'Osito',
    category: 'velas',
    description: 'Vela verde envuelta, estilo regalo creativo.',
    price: '3.000',
    image: '/images/products/candles/vela13.webp',
    tag: null,
  },
  {
    id: 24,
    name: 'Perro',
    category: 'velas',
    description: 'Vela blanca en figura de perro, estilo regalo creativo.',
    price: '10.500',
    image: '/images/products/candles/vela14.webp',
    tag: null,
  },
  /*
  PENDIENTE MODIFICAR
  {
    id: 25,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela15.webp',
    tag: 'Edición limitada',
  },
  {
    id: 26,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/products/candles/vela16.webp',
    tag: 'Edición limitada',
  } */
 {
    id: 27,
    name: 'Grande con bonsai',
    category: 'materas',
    description: 'Matera grande con diseño geométrico, ideal para plantas de mayor tamaño.',
    price: '18.000',
    image: '/images/products/candles/vela15.webp',
    tag: null,
 }
]
