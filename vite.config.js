import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { contact } from './src/config/site.js'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    /**
     * En producción /api/instagram es una función de Vercel que cachea el feed
     * de Behold (ver api/instagram.js). En desarrollo no hay funciones, así que
     * redirigimos esa ruta al feed real: el componente se comporta igual en los
     * dos entornos y no hace falta código condicional.
     */
    proxy: contact.instagramSourceUrl
      ? {
          '/api/instagram': {
            target: contact.instagramSourceUrl,
            changeOrigin: true,
            rewrite: () => '',
          },
        }
      : undefined,
  },
})
