/* ══════════════════════════════════════════════════════
   TNB Financial Manager  |  sw.js
   Service Worker — Updated for Folder Structure & Fresh Data
   Strategy: Network-First for Pages, Stale-While-Revalidate for Assets
══════════════════════════════════════════════════════ */

// Bump this string whenever any cached file changes — old caches are deleted on activate.
// Format: tnb-vYYYY-vN  (year + sequential version)
const CACHE_NAME = 'tnb-v2026-v3';

// သင့် folder structure ထဲက ဖိုင်အားလုံးကို ဒီမှာ ထည့်သွင်းထားပါတယ်
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
  '_new_components.css', // Folder ထဲမှာ ရှိတဲ့ CSS အသစ်
  'login-script.js',
  'register-script.js',
  'reset-script.js',
  'dashboard.js',
  'history.js',
  'cache.js',           // Folder ထဲမှာ ပါတဲ့ cache utility
  'manifest.json',
  'icon.png',
  'icon-512.png',
];

/* ── INSTALL ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[SW] Install: caching assets');

      // FIX: cache critical app shell first — any 404 here aborts install
      const critical = ASSETS.filter(a => !a.match(/\.(png|ico)$/));
      // FIX: cache images with allSettled so a missing icon does not abort install
      const images   = ASSETS.filter(a =>  a.match(/\.(png|ico)$/));

      await cache.addAll(critical);

      await Promise.allSettled(
        images.map(img =>
          cache.add(img).catch(err =>
            console.warn('[SW] Non-critical asset not cached:', img, err)
          )
        )
      );
    })
    // FIX: skipWaiting() moved INSIDE waitUntil so it only fires after
    // cache is fully populated — previously it fired before addAll resolved,
    // causing the SW to activate and intercept requests on cache misses.
    .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        )
      )
      // FIX: clients.claim() moved INSIDE waitUntil so it only runs after old
      // caches are fully deleted — previously it could claim a client while
      // stale caches were still being removed, causing a brief window of
      // requests being served from the wrong (old) cache.
      .then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // ၁။ Supabase API (Data) အတွက်ဆိုရင် Network ကနေပဲ တိုက်ရိုက်ယူမယ်
  // FIX: added offline fallback — previously fetch() failure propagated
  // as an uncaught network error through the SW fetch chain.
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
    return;
  }

  // ၂။ HTML Pages တွေအတွက် Network-First Strategy သုံးမယ်
  // ဒါမှ Logout လုပ်ပြီး ပြန်ဝင်ရင် Data အဟောင်းကြီး မပေါ်နေမှာ ဖြစ်ပါတယ်
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          // FIX: fallback uses scoped cache.match (not global caches.match)
          // so we never accidentally serve a page from a stale old-version cache.
          .catch(() => cache.match(event.request))
      )
    );
    return;
  }

  // ၃။ CSS, JS နဲ့ ပုံတွေအတွက် Stale-While-Revalidate သုံးမယ် (မြန်အောင်လို့ပါ)
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => {
          // FIX: previously returned `cached` which is undefined on first
          // visit, causing respondWith(undefined) → TypeError crash.
          // Now returns the cached version if available, otherwise a 503
          // so the SW always resolves with a valid Response.
          return cached || new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        });

        return cached || networkFetch;
      })
    )
  );
});
