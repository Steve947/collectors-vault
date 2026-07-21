// Hoardr Service Worker — v1.0
const CACHE_NAME = 'hoardr-v2';
// RELATIVE paths — the site is served from the root on hoardrapp.com but from
// /collectors-vault/ on github.io. Absolute /collectors-vault/ paths 404 on the
// custom domain, which makes cache.addAll() reject and the worker never install.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './icon-192.png',
  './icon-512.png',
];

// Install — cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Firebase requests — always go to network (never cache auth/db calls)
  const url = event.request.url;
  if (url.includes('firestore.googleapis.com') ||
      url.includes('firebase') ||
      url.includes('googleapis.com') ||
      url.includes('gstatic.com/firebasejs')) {
    return; // Let browser handle normally
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a copy of successful responses for the app shell
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Return the main app page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/collectors-vault/index.html');
          }
        });
      })
  );
});
