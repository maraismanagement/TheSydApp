const CACHE_NAME = 'thesyd-v1';
const ASSETS = [
  '/',
  '/css/style.css',
  '/js/app.js',
  '/js/tabs.js',
  '/js/accordion.js',
  '/js/search.js',
  '/js/share.js',
  '/js/events.js',
  '/js/guest-info.js',
  '/properties-data.json',
  '/images/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Skip API calls and Netlify functions
  if (event.request.url.includes('/api/') || event.request.url.includes('/.netlify/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
