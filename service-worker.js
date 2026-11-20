
const CACHE_NAME = "dataviz-v2";

cconst FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    if (event.request.url.includes("chart.js")) {
        event.respondWith(
            caches.match(event.request).then(response =>
                response || fetch(event.request)
            )
        );
        return;
    }

    if (event.request.method === "GET") {
        event.respondWith(
            caches.match(event.request).then(response =>
                response || fetch(event.request)
            )
        );
    }
});
