/**
 * Datos de productos HERIN
 * 
 * Para actualizar:
 * - Cambia las URLs de imagen por las reales de tus productos
 * - Modifica nombres, descripciones y precios según tu catálogo
 * - Usa imágenes cuadradas (1:1) o 4:5 para mejor presentación
 */

export const WHATSAPP_NUMBER = '573223772019' // ← Cambia por el número real de HERIN

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'materas', label: 'Materas' },
  { id: 'velas', label: 'Velas' },
]

export const products = [
  // === MATERAS ===
  {
    id: 1,
    name: 'Raíces',
    category: 'materas',
    description: 'Matera geométrica en cemento y marmolina con suculenta echevería. Acabado natural con vetas únicas.',
    price: '45.000',
    image: '/images/materahex.webp',
    tag: 'Popular',
  },
  {
    id: 2,
    name: 'Brotes',
    category: 'materas',
    description: 'Matera cilíndrica pintada a mano con motivos florales. Incluye suculenta sedum.',
    price: '38.000',
    image: '/images/materahex2.webp',
    tag: null,
  },
  {
    id: 3,
    name: 'Montaña',
    category: 'materas',
    description: 'Matera escalonada inspirada en terrazas naturales. Cemento gris con detalles en terracota.',
    price: '55.000',
    image: '/images/materahex3.webp',
    tag: 'Nuevo',
  },
  {
    id: 4,
    name: 'Nido',
    category: 'materas',
    description: 'Mini matera con forma orgánica redondeada. Perfecta para escritorios y repisas.',
    price: '28.000',
    image: '/images/materacanasta.webp',
    tag: null,
  },
  {
    id: 5,
    name: 'Tierra Viva',
    category: 'materas',
    description: 'Matera hexagonal con acabado marmolado. Incluye cactus miniatura seleccionado.',
    price: '42.000',
    image: '/images/materacanasta2.webp',
    tag: null,
  },
  {
    id: 6,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/materaelefante.webp',
    tag: 'Edición limitada',
  },
  {
    id: 7,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/materacircular.webp',
    tag: 'Edición limitada',
  }, 

  // === VELAS ===

  {
    id: 8,
    name: 'Bosque',
    category: 'velas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/velasencilla.webp',
    tag: 'Edición limitada',
  },  {
    id: 9,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
image: '/images/velasencilla2.webp',
    tag: 'Edición limitada',
  },  {
    id: 10,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: '/images/materaelefante.webp',
    tag: 'Edición limitada',
  },
  {
    id: 11,
    name: 'Atardecer',
    category: 'velas',
    description: 'Vela de cera de soja con aroma a vainilla y canela. Pintada a mano con tonos cálidos del ocaso.',
    price: '32.000',
    image: 'https://images.unsplash.com/photo-1602607079888-67c3e93efce6?w=600&h=700&fit=crop&crop=center',
    tag: 'Más vendida',
  },
  {
    id: 12,
    name: 'Luna Llena',
    category: 'velas',
    description: 'Vela esférica con aroma a lavanda. Figura pintada de luna y estrellas. Ideal para relajación.',
    price: '35.000',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 13,
    name: 'Jardín Secreto',
    category: 'velas',
    description: 'Vela con forma de flor en cera de soja. Aroma suave a jazmín y rosa. Colores pastel.',
    price: '40.000',
    image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=600&h=700&fit=crop&crop=center',
    tag: 'Nuevo',
  },
  {
    id: 14,
    name: 'Abrazo',
    category: 'velas',
    description: 'Vela con figura de oso pintada a mano. Aroma a miel y almendras. Regalo perfecto.',
    price: '30.000',
    image: 'https://images.unsplash.com/photo-1608181831718-2501c63ee587?w=600&h=700&fit=crop&crop=center',
    tag: 'Para regalar',
  },
  {
    id: 15,
    name: 'Brisa',
    category: 'velas',
    description: 'Vela en vaso de cemento reutilizable. Aroma fresco a eucalipto y menta. 40 horas de duración.',
    price: '45.000',
    image: 'https://images.unsplash.com/photo-1599446220256-0a7c80634cf2?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 16,
    name: 'Refugio',
    category: 'velas',
    description: 'Set de 3 mini velas con aromas de bosque: pino, cedro y musgo. Presentación en caja artesanal.',
    price: '52.000',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=700&fit=crop&crop=center',
    tag: 'Edición limitada',
  },
]
