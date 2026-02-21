/* ══════════════════════════════════════════════════════
   TNB Financial Manager  |  sw.js
   Service Worker — Cache Strategy: Stale-While-Revalidate
   ⚠️  Cache logic and offline behavior UNTOUCHED.
   Cache version bumped to reflect UI v5.1 assets + history page split.
══════════════════════════════════════════════════════ */
const CACHE_NAME = 'tnb-v2026-v3';
/* All static assets to precache on install (UNCHANGED list) */
const ASSETS = [
  'index.html',
  'register.html',
  'reset.html',
  'dashboard.html',
  'history.html',
  'login-style.css',
  'register-style.css',
  'reset-style.css',
  'dashboard.css',
  'history.css',
  'login-script.js',
  'register-script.js',
  'reset-script.js',
  'dashboard.js',
  'history.js',
  'manifest.json',
  'icon.png',
  'icon-512.png',
];
/* ── INSTALL — precache all assets (UNCHANGED) ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});
/* ── ACTIVATE — delete old caches (UNCHANGED) ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
/* ── FETCH — Stale-While-Revalidate for UI,
              Network-Only for Supabase (UNCHANGED) ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  /* Network-only for Supabase API calls (UNCHANGED) */
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }
  /* Network-only for non-GET requests (UNCHANGED) */
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }
  /* Stale-While-Revalidate for all other requests (UNCHANGED) */
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          /* Cache valid responses (UNCHANGED) */
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => cached);
        /* Serve cached immediately, update in background (UNCHANGED) */
        return cached || networkFetch;
      })
    )
  );
});
