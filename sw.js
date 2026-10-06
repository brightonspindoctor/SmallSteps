/* Small Steps service worker.
   Pages: network first, so new deploys show up straight away; cached copy when offline.
   Other files: cache first, refreshed in the background. */
// Keep VERSION in step with the ?v= numbers in index.html.
const VERSION='159';
const CACHE='small-steps-v'+VERSION;
const ASSETS=['./','./index.html','./manifest.webmanifest',
  './css/base.css?v='+VERSION,'./css/forest-home.css?v='+VERSION,'./css/forest-type.css?v='+VERSION,'./css/forest-landing.css?v='+VERSION,'./css/forest-cleanup.css?v='+VERSION,
  './js/app.js?v='+VERSION,'./js/forest-home.js?v='+VERSION,'./js/forest-quotes.js?v='+VERSION,
  './assets/icons/small-steps-forest-logo.webp','./assets/icons/icon-192.png',
  './assets/illustrations/landscape.svg','./assets/illustrations/forest-bg-portrait.webp','./assets/illustrations/forest-bg-portrait.jpg',
  './assets/illustrations/forest-theme1-bg.webp','./assets/illustrations/happenings-envelope.svg',
  './assets/illustrations/forest-sunrise.webp','./assets/illustrations/forest-day.webp',
  './assets/illustrations/forest-sunset.webp','./assets/illustrations/forest-night.webp'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

function stash(request,response){
  if(response&&response.ok&&response.type==='basic'){
    const copy=response.clone();
    caches.open(CACHE).then(c=>c.put(request,copy));
  }
  return response;
}

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;

  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req).then(res=>stash(req,res))
        .catch(()=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      const network=fetch(req).then(res=>stash(req,res)).catch(()=>cached);
      return cached||network;
    })
  );
});
