// Service Worker — Oeste Automatismos
const CACHE = 'oeste-v1';
const ASSETS = [
  '/',
  '/index.html',
];

// Instalar — cache dos assets estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar — limpar caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first para Supabase, cache first para assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Supabase API — sempre network, sem cache
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Assets estáticos — cache first, fallback network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
