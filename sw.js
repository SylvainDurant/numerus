const cacheName = 'numerus';
const staticResource = [
  './index.html',
  './style/style.css',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  console.log("service worker has been installed");
  
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(staticResource);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log("service worker has been activated");
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  console.log("fetch emitted", e);
  
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
