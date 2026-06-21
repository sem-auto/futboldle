# Activar estadisticas globales y reportes

La web funciona sin Supabase. Estos pasos activan los porcentajes reales y centralizan los reportes enviados por los usuarios.

1. Crea un proyecto gratuito en Supabase.
2. Abre `SQL Editor`, copia el contenido de `supabase/schema.sql` y ejecútalo.
3. En Vercel abre `Settings > Environment Variables`.
4. Añade:
   - `SUPABASE_URL`: URL del proyecto Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: clave `service_role` del proyecto.
5. Vuelve a desplegar la web en Vercel.

La clave `service_role` solo se usa en rutas del servidor y nunca se envía al navegador.

Los porcentajes reales aparecen cuando un reto acumula al menos cinco partidas. Hasta entonces se mantiene el valor estimado existente.
