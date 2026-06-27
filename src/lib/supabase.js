import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  // Ayuda a detectar a tiempo si falta configurar el .env
  console.error(
    '[Herin] Faltan variables de entorno de Supabase. ' +
    'Crea un archivo .env con VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
