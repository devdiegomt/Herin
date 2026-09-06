# Herin — Landing Page

Landing page tipo catálogo para **Herin**, marca artesanal de materas y velas.
Diseñada para conversión a WhatsApp.

## Inicio rápido

```bash
npm install
npm run dev        # Desarrollo
npm run build      # Producción
npm run preview    # Preview de build
```

## Personalización

### Número de WhatsApp
`src/data/products.js` → `WHATSAPP_NUMBER`

### Productos
Se crea una página /admin para agregar productos y editarlos.

### Imágenes recomendadas
- Productos: 600×700px (ratio 4:5)
- Hero: 1600×1000px
- About: 400×500px y 400×300px

### Datos del negocio
`src/config/site.js` → WhatsApp, dirección, horario, Instagram y secciones del menú.

## Previsualización al compartir (WhatsApp / Instagram)

`api/producto.js` es una función serverless de Vercel: sirve `/producto/:slug`
con el título, la descripción y la foto del producto ya escritos en el HTML.
Hace falta porque los previsualizadores de WhatsApp e Instagram no ejecutan
JavaScript, así que sin ella todos los productos compartían la misma imagen.

El enrutado está en `vercel.json`. La función usa las mismas variables que el
sitio (`VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`), que Vercel ya
expone a las funciones; no hay que configurar nada extra.

Si Supabase no responde, devuelve el HTML genérico con estado 200: nunca rompe
la página.

Para probar un cambio en las etiquetas, usa el depurador de Facebook o
`curl https://TU-SITIO/producto/UN-SLUG | grep og:`.

## Mantenimiento de imágenes

Las fotos nuevas se optimizan solas en el navegador al subirlas desde `/admin`
(`src/utils/optimizeImage.js`). Para poner al día las que ya estaban:

```bash
node scripts/optimize-existing-images.js          # simulacro
node scripts/optimize-existing-images.js --apply  # aplica
```

Requiere `ADMIN_EMAIL` y `ADMIN_PASSWORD` temporalmente en `.env`. Ver la
cabecera del script para las opciones y cómo revertir.

---

Desarrollado por [Fulcro](https://fulcrotech.vercel.app) · 2026
