/* ══════════════════════════════════════════════════════
   TNB Financial Manager  |  sw.js
   Service Worker — Updated for Folder Structure & Fresh Data
   Strategy: Network-First for Pages, Stale-While-Revalidate for Assets
══════════════════════════════════════════════════════ */

const CACHE_NAME = 'tnb-v2026-v3.2'; // Version ကို တိုးလိုက်တာက cache အဟောင်းတွေကို ရှင်းထုတ်ဖို့ဖြစ်ပါတယ်

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
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching all assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE ── */
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

/* ── FETCH ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // ၁။ Supabase API (Data) အတွက်ဆိုရင် Network ကနေပဲ တိုက်ရိုက်ယူမယ်
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ၂။ HTML Pages တွေအတွက် Network-First Strategy သုံးမယ်
  // ဒါမှ Logout လုပ်ပြီး ပြန်ဝင်ရင် Data အဟောင်းကြီး မပေါ်နေမှာ ဖြစ်ပါတယ်
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // Offline ဖြစ်မှသာ cache ထဲကဟာကို ပြမယ်
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
        }).catch(() => cached);
        
        return cached || networkFetch;
      })
    )
  );
});
