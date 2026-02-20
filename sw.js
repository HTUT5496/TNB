/* ══════════════════════════════════════════════════
   TNB Finance – Service Worker v5.0
   GitHub Pages: htut5496.github.io/TNB/
   Strategy: Stale-While-Revalidate for UI assets
             Network-Only for Supabase API calls
══════════════════════════════════════════════════ */

const CACHE_NAME = 'tnb-v5.0';

/* All assets with /TNB/ prefix for GitHub Pages */
const ASSETS = [
  '/TNB/',
  '/TNB/index.html',
  '/TNB/login-style.css',
  '/TNB/login-script.js',
  '/TNB/register.html',
  '/TNB/register-style.css',
  '/TNB/register-script.js',
  '/TNB/dashboard.html',
  '/TNB/dashboard.css',
  '/TNB/dashboard.js',
  '/TNB/reset.html',
  '/TNB/reset-style.css',
  '/TNB/reset-script.js',
  '/TNB/manifest.json',
  '/TNB/icon.png',
  '/TNB/icon-512.png',
];

/* 1. Install — cache all assets */
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('TNB SW: Caching shell assets');
      return cache.addAll(ASSETS).catch(err => {
        console.warn('TNB SW: Some assets failed to cache', err);
      });
    })
  );
});

/* 2. Activate — remove old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* 3. Fetch — smart strategy */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  /* Network-Only for Supabase API (auth, database, storage) */
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('jsdelivr.net')
  ) {
    return; /* Pass through to network */
  }

  /* Stale-While-Revalidate for all UI assets */
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request)
          .then(response => {
            if (response && response.status === 200 && response.type !== 'opaque') {
              cache.put(e.request, response.clone());
            }
            return response;
          })
          .catch(() => cached); /* Offline fallback */

        return cached || fetchPromise;
      })
    )
  );
});
