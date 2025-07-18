const CACHE_NAME = 'gold-calculator-v2024.05';
const urlsToCache = [
  '/Gold-calculator-app/',
  '/Gold-calculator-app/index.html',
  '/Gold-calculator-app/calculator.html',
  '/Gold-calculator-app/styles.css',
  '/Gold-calculator-app/script.js',
  '/Gold-calculator-app/manifest.json'
];

// Install event - cache all required files
self.addEventListener('install', event => {
  // Skip waiting to activate new service worker immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', event => {
  // Take control of all pages immediately
  event.waitUntil(Promise.all([
    // Take control of all clients immediately
    clients.claim(),
    // Delete old caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  ]));
});
