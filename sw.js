// Guarda la app para que funcione sin cobertura en el gimnasio.
// Sube CACHE cuando cambies index.html para que los móviles cojan la versión nueva.
const CACHE = "cuaderno-fuerza-v2";
const FILES = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("cuaderno-fuerza") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Páginas: primero la red (para coger cambios), si no hay cobertura, la copia guardada.
// Resto (iconos, fuentes): primero la copia guardada.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // La app de cocina (/comidas/) tiene su propio service worker
  if (new URL(req.url).pathname.includes("/comidas/")) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put("./", copy)); return res;
    }).catch(() => caches.match("./")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
