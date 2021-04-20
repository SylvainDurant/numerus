console.log("in sw.js");
let cacheName = 'numerus';
let filesToCache = [
  './index.html',
  './style/style.css',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
    caches.open(cacheName).then(cache => {
      return cache.match(evt.request).then(cacheResponse => cacheResponse || fetch(evt.request).then(networkResponse => {
      cache.put(evt.request, networkResponse.clone());
      return networkResponse;
    });
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
