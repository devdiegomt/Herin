# Herin · Guía Fase 5 — Subir los productos a Supabase

Esto sube tus 15 productos actuales (8 materas, 7 velas) con sus fotos al
Storage de Supabase y los inserta en la base. Después de esto, el catálogo
del sitio se verá lleno.

---

## Antes de empezar

Necesitas tener listo (de la Fase 1):
- El archivo `.env` en la raíz del proyecto, con tu URL y publishable key.
- El usuario admin creado en Supabase (correo + contraseña de tu mamá).

---

## Pasos

1. **Instala dependencias** (si no lo has hecho):
   ```bash
   npm install
   ```

2. **Agrega temporalmente las credenciales del admin al `.env`.**
   Abre el archivo `.env` y añade estas dos líneas al final:
   ```
   ADMIN_EMAIL=correo-de-tu-mama@ejemplo.com
   ADMIN_PASSWORD=la-contraseña-que-creaste
   ```
   (Son las del usuario que creaste en Supabase → Authentication → Users.)

3. **Corre la migración:**
   ```bash
   node scripts/migration/migrate.js
   ```
   Verás el progreso producto por producto. Al final, un resumen:
   ```
   Creados:  15
   Saltados: 0
   Fallidos: 0
   ```

4. **Borra las credenciales del `.env`.**
   Quita las líneas `ADMIN_EMAIL` y `ADMIN_PASSWORD` que agregaste en el paso 2.
   Ya no se necesitan.

5. **Revisa el catálogo:**
   ```bash
   npm run dev
   ```
   Abre el sitio. El catálogo debe mostrar los 15 productos, con búsqueda,
   filtros y vista de detalle funcionando.

---

## Si algo sale mal

- **"No pude iniciar sesión"** → revisa que `ADMIN_EMAIL` y `ADMIN_PASSWORD`
  sean exactamente los del usuario admin en Supabase. Si en la Fase 1 dejaste
  activada la confirmación de correo, confírmalo primero o desactívala.

- **Quiero empezar de cero** → corre el script de limpieza (borra todos los
  productos e imágenes, deja las categorías intactas) y vuelve a migrar:
  ```bash
  node scripts/migration/reset.js
  node scripts/migration/migrate.js
  ```

- **Editar nombres / precios / descripciones antes de subir** → todo está en
  `scripts/migration/manifest.js`. Edítalo y corre la migración.

---

## ¿Qué sigue?

Con el catálogo lleno y aprobado, la **Fase 4** es el panel de administración:
el login de tu mamá en `/admin` para que ella misma agregue, edite y elimine
productos y suba fotos, sin tocar código.
