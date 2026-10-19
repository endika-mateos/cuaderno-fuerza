# Cuaderno de Fuerza

App web instalable para el plan de gimnasio en temporada: sesiones A (torso), B (fuerza y potencia) y C (prevención), registro de pesos con propuesta de progresión, temporizador de descanso, seguimiento del peso corporal y copia de seguridad.

Los datos se guardan en el propio móvil (localStorage). Funciona sin conexión gracias al service worker (`sw.js`).

## Instalar en iPhone

1. Abre la web en **Safari**.
2. Botón de compartir → **Añadir a pantalla de inicio**.

## Actualizar

Al cambiar `index.html`, sube la versión de `CACHE` en `sw.js`.

# Cuaderno de Cocina (`/comidas/`)

Segunda app, con su propio icono: recetario con macros por ración, plan semanal según la carga de entreno de cada día, lista de la compra automática (para compartir) y notas para aprender cada receta.

Se instala igual, abriendo `/comidas/` en Safari → **Añadir a pantalla de inicio**.
