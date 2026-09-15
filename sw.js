const CACHE = 'small-steps-v1.47-landing-clean';
const ASSETS = [
  './','./index.html','./manifest.webmanifest','./css/base.css','./css/forest-home.css','./css/forest-type.css','./js/app.js','./js/forest-home.js',
  './assets/icons/small-steps-forest-logo.webp','./assets/icons/small-steps-opening-logo.svg','./assets/illustrations/forest-bg-portrait.webp','./assets/illustrations/forest-bg-portrait.jpg','./assets/illustrations/forest-theme1-bg.webp',
  './assets/illustrations/forest-sunrise.webp.webp','./assets/illustrations/forest-day.webp.webp','./assets/illustrations/forest-sunset.webp.webp','./assets/illustrations/forest-night.webp.webp','./assets/illustrations/happenings-envelope.svg'
];
const FOREST_CLEANUP = `
/* The Buy Me a Coffee support card belongs only on More. */
body.theme-forest .screen:not(:has(.forest-support-card)) .support-card{display:none!important}
body.theme-forest .screen:not(:has(.forest-support-card)) .about-support-link{display:none!important}
body.theme-forest .screen:not(:has(.forest-support-card)) .card:has(a[href*="buymeacoffee"]){display:none!important}
body.theme-forest .screen:not(:has(.forest-support-card)) a[href*="buymeacoffee"]{display:none!important}
`;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(c => c.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
