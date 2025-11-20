self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("videth-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "product.html",
                "styles.css",
                "script.js",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
