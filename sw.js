const CACHE_NAME = "videth-cache-v1";
const ASSETS = [
  "index.html",
  "product.html",
  "styles.css",
  "script.js",
  "manifest.json"
  // si tienes iconos pequeños añade por ejemplo:
  // "assets/icon-192.png",
  // "assets/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
