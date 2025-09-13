self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("classhub-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/src/main.tsx"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


