const CACHE = 'small-steps-v1.32-forest-fixes';
const ASSETS = [
  './','./index.html','./manifest.webmanifest','./css/base.css','./css/forest-home.css','./js/app.js','./js/forest-home.js',
  './assets/icons/small-steps-forest-logo-180.png','./assets/icons/small-steps-forest-logo-192.png','./assets/icons/small-steps-forest-logo-512.png','./assets/icons/small-steps-forest-logo-1024.png',
  './assets/illustrations/forest-theme1-bg.webp','./assets/illustrations/happenings-envelope.svg'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(c => c.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
