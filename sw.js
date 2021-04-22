const cacheName = 'numerus-static-v1.3.7';
const assets = [
  '/index.html',
  '/favicon.ico',
  '/style/style.css',
  '/js/main.js',
  '/js/app.js',
  '/images/background.jpg'
];

///// INSTALL SERVICE WORKER
self.addEventListener('install', evt => {
  console.log("service worker has been installed");
  
  // cache the static assets
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("caching static assets");
      cache.addAll(assets);
    })
  );
});

///// ACTIVATE SERVICE WORKER
self.addEventListener('activate', evt => {
  console.log("service worker has been activated");

  // deleting old caches
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key)))
    })
  )
});

///// FETCH EVENTS
// looks what the app is fetching
self.addEventListener('fetch', evt => {
  // looks if the fetched asset is already in the cache
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request);
    })
  );
});
