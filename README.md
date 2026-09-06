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

## Feed de Instagram

La sección muestra las publicaciones reales de **@herin_oficial**, vía
[Behold](https://behold.so) (plan gratuito, 6 publicaciones).

**Cómo viaja el dato:**

```
navegador → /api/instagram (función de Vercel, cacheada) → feeds.behold.so
```

El navegador nunca llama a Behold directamente. La razón es el cupo: el plan
gratuito permite **1.200 lecturas al mes**, y si cada visitante leyera el feed,
una racha de tráfico desde Instagram lo agotaría en días. Con la función de por
medio el CDN atiende a casi todo el mundo y a Behold le llegan unas pocas
lecturas al día, entren 50 personas o 50.000. A cambio, una publicación nueva
tarda hasta ~6 h en aparecer.

La función además recorta la respuesta de 25 KB a 4 KB: se queda solo con lo que
la grilla dibuja y descarta biografía, número de seguidores y las URLs originales
de Instagram.

**Dónde se configura** (`src/config/site.js` → `contact`):

- `instagramSourceUrl` — la URL de Behold. Es lo único que hay que cambiar si se
  rehace el feed. Ponla en `null` para volver a las fotos elegidas a mano.
- `instagramFeedPath` — lo que pide el navegador (`/api/instagram`). No tocar.

En desarrollo no hay funciones de Vercel, así que `vite.config.js` redirige
`/api/instagram` al feed real: el componente se comporta igual en ambos entornos.

**Si algo falla** (Behold caído, cupo agotado, feed vacío) la sección vuelve a
las fotos de respaldo de `src/components/InstagramFeed.jsx` y el título cambia de
"Lo último desde" a "Encuéntranos en", para no prometer contenido reciente que no
lo es. Los errores no se cachean, así que se recupera solo.

**Para rehacer el feed en Behold:** Sources → conectar Instagram (tipo *Basic*),
luego Feeds → `+ Add Feed` → Content type *User*, Output type *JSON* → number of
posts 6, lista de dominios vacía.

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
