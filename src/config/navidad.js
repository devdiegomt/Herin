/**
 * Colección de Navidad.
 *
 * Todo lo de la temporada se configura acá. Cuando pase Navidad no hay que
 * borrar código: la sección se apaga sola el 27 de diciembre (ver `enTemporada`).
 *
 * CÓMO SE MARCA UN PRODUCTO COMO NAVIDEÑO
 * En el panel (/admin), al crear o editar el producto, en el campo
 * **Etiqueta** se escribe:  Navidad
 * Eso basta. Aparece solo en la colección, con su distintivo, y el chip
 * "Navidad" se activa en el catálogo. No hay que crear categorías ni tocar
 * la base de datos.
 */

// La etiqueta que se escribe en el panel. Se compara sin tildes ni mayúsculas.
export const ETIQUETA = 'Navidad'

export const navidad = {
  titulo: 'Colección Navidad',
  subtitulo: 'Hecha a mano para la temporada',

  // El 7 de diciembre es el Día de las Velitas: el día que Colombia entera
  // prende velas y arranca la Navidad. Es el gancho más fuerte del catálogo.
  gancho: {
    titulo: 'Día de las Velitas',
    fecha: '2026-12-07',
    // Hasta cuándo se reciben pedidos para que lleguen a tiempo
    cierrePedidos: '2026-12-05',
  },

  // Segundo momento: el regalo de Nochebuena
  entrega: {
    titulo: 'Nochebuena',
    fecha: '2026-12-24',
    cierrePedidos: '2026-12-20',
  },

  // La sección aparece y desaparece sola.
  desde: '2026-11-01',
  hasta: '2026-12-26',
}

/** ¿Un producto es de la colección de Navidad? */
export function esNavideno(producto) {
  return limpia(producto?.tag) === limpia(ETIQUETA)
}

/**
 * ¿Estamos en temporada?
 *
 * `?navidad=1` en la URL permite verla fuera de fecha para revisarla o
 * mostrársela a alguien; `?navidad=0` la esconde aunque sea diciembre.
 */
export function enTemporada(busqueda = '') {
  const forzado = new URLSearchParams(busqueda).get('navidad')
  if (forzado === '1') return true
  if (forzado === '0') return false

  const hoy = new Date()
  return hoy >= nuevaFecha(navidad.desde) && hoy <= finDelDia(navidad.hasta)
}

/**
 * Días que faltan para una fecha. Devuelve null si ya pasó, para que la
 * cuenta regresiva desaparezca en vez de mostrar números negativos.
 */
export function diasPara(fecha) {
  const destino = finDelDia(fecha)
  // floor y no ceil: contar el día en curso como entero exagera el plazo.
  // El último día devuelve 0, que el banner muestra como "último día".
  const dias = Math.floor((destino - new Date()) / 86400000)
  return dias >= 0 ? dias : null
}

/** El momento vigente: primero Velitas, y cuando pasa, Nochebuena. */
export function momentoVigente() {
  if (diasPara(navidad.gancho.cierrePedidos) !== null) return navidad.gancho
  if (diasPara(navidad.entrega.cierrePedidos) !== null) return navidad.entrega
  return null
}

// --- internos ---

// new Date('2026-12-07') se interpreta como UTC y en Colombia (UTC-5) cae un
// día antes. Construyéndola por partes queda en hora local, que es la que ve
// la persona.
function nuevaFecha(iso) {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
}

function finDelDia(iso) {
  const f = nuevaFecha(iso)
  f.setHours(23, 59, 59, 999)
  return f
}

function limpia(texto) {
  return String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}
