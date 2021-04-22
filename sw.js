const cacheName = 'numerus-static';
const assets = [
  './index.html',
  './style/style.css',
  './js/main.js',
  './js/app.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', evt => {
  console.log("service worker has been installed");
  
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("caching static assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  console.log("service worker has been activated");
});

// /* Serve cached content when offline */
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request);
    })
  );
});
