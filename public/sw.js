/* eslint-disable no-restricted-globals */
const CACHE_VERSION = '@0.2';
const urlsToCache = [
  '/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('[serviceWorker] add all cache from array');
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener('activate', (event) => {
  // ativa steps
  console.log('[serviceWorker] ativo');
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(cacheNames.map((thisCacheName) => {
      if (thisCacheName !== CACHE_VERSION) {
        console.log('[Service Worker] Removing caching files from', thisCacheName);
        return caches.delete(thisCacheName);
      }

      return false;
    }))),

  );
});

/**
 * not cache all fetch data, only if match list cached
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});