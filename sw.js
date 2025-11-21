const CACHE_NAME = "videth-cache-v1";

const ASSETS = [
  "/",                // importante para GitHub Pages
  "/index.html",
  "/product/index.html",
  "/category/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

// INSTALAR SERVICE WORKER
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ACTIVAR SERVICE WORKER
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH = USAR CACHE SI EXISTE
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
