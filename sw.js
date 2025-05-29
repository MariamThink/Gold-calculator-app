const CACHE_NAME = 'gold-calculator-v1';
const urlsToCache = [
  '/Gold-calculator-app/calculator.html',
  '/Gold-calculator-app/styles.css',
  '/Gold-calculator-app/script.js',
  '/Gold-calculator-app/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
