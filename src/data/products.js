/**
 * Datos de productos HERIN
 * 
 * Para actualizar:
 * - Cambia las URLs de imagen por las reales de tus productos
 * - Modifica nombres, descripciones y precios según tu catálogo
 * - Usa imágenes cuadradas (1:1) o 4:5 para mejor presentación
 */

export const WHATSAPP_NUMBER = '573001234567' // ← Cambia por el número real de HERIN

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
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=700&fit=crop&crop=center',
    tag: 'Popular',
  },
  {
    id: 2,
    name: 'Brotes',
    category: 'materas',
    description: 'Matera cilíndrica pintada a mano con motivos florales. Incluye suculenta sedum.',
    price: '38.000',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 3,
    name: 'Montaña',
    category: 'materas',
    description: 'Matera escalonada inspirada en terrazas naturales. Cemento gris con detalles en terracota.',
    price: '55.000',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=700&fit=crop&crop=center',
    tag: 'Nuevo',
  },
  {
    id: 4,
    name: 'Nido',
    category: 'materas',
    description: 'Mini matera con forma orgánica redondeada. Perfecta para escritorios y repisas.',
    price: '28.000',
    image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 5,
    name: 'Tierra Viva',
    category: 'materas',
    description: 'Matera hexagonal con acabado marmolado. Incluye cactus miniatura seleccionado.',
    price: '42.000',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 6,
    name: 'Bosque',
    category: 'materas',
    description: 'Set de 3 mini materas con figuras de animales del bosque. Pintadas a mano con pigmentos naturales.',
    price: '68.000',
    image: 'https://images.unsplash.com/photo-1501004318855-e4b3e0e10cb2?w=600&h=700&fit=crop&crop=center',
    tag: 'Edición limitada',
  },

  // === VELAS ===
  {
    id: 7,
    name: 'Atardecer',
    category: 'velas',
    description: 'Vela de cera de soja con aroma a vainilla y canela. Pintada a mano con tonos cálidos del ocaso.',
    price: '32.000',
    image: 'https://images.unsplash.com/photo-1602607079888-67c3e93efce6?w=600&h=700&fit=crop&crop=center',
    tag: 'Más vendida',
  },
  {
    id: 8,
    name: 'Luna Llena',
    category: 'velas',
    description: 'Vela esférica con aroma a lavanda. Figura pintada de luna y estrellas. Ideal para relajación.',
    price: '35.000',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 9,
    name: 'Jardín Secreto',
    category: 'velas',
    description: 'Vela con forma de flor en cera de soja. Aroma suave a jazmín y rosa. Colores pastel.',
    price: '40.000',
    image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=600&h=700&fit=crop&crop=center',
    tag: 'Nuevo',
  },
  {
    id: 10,
    name: 'Abrazo',
    category: 'velas',
    description: 'Vela con figura de oso pintada a mano. Aroma a miel y almendras. Regalo perfecto.',
    price: '30.000',
    image: 'https://images.unsplash.com/photo-1608181831718-2501c63ee587?w=600&h=700&fit=crop&crop=center',
    tag: 'Para regalar',
  },
  {
    id: 11,
    name: 'Brisa',
    category: 'velas',
    description: 'Vela en vaso de cemento reutilizable. Aroma fresco a eucalipto y menta. 40 horas de duración.',
    price: '45.000',
    image: 'https://images.unsplash.com/photo-1599446220256-0a7c80634cf2?w=600&h=700&fit=crop&crop=center',
    tag: null,
  },
  {
    id: 12,
    name: 'Refugio',
    category: 'velas',
    description: 'Set de 3 mini velas con aromas de bosque: pino, cedro y musgo. Presentación en caja artesanal.',
    price: '52.000',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=700&fit=crop&crop=center',
    tag: 'Edición limitada',
  },
]
