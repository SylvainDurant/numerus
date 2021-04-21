const cacheName = 'numerus-static';
const staticResource = [
  '/',
  '/index.html',
  '/style/style.css',
  '/js/main.js',
  '/js/app.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  console.log("service worker has been installed");
  
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("caching static resources");
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
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
