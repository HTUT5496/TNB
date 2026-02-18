const CACHE_NAME = "tnb-v2026-v1"; // Updated versioning
const ASSETS = [
  "/",
  "index.html",
  "login-style.css",
  "login-script.js",
  "register.html",
  "register-style.css",
  "register-script.js",
  "dashboard.html",
  "dashboard1.css", // Added split CSS
  "dashboard2.css", // Added split CSS
  "dashboard.js",
  "reset.html",
  "reset-style.css",
  "reset-script.js",
  "manifest.json",
  "icon.png",
  "icon-512.png",
];

// 1. Install Event: Populate Cache
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("TNB: Caching Premium UI Shell");
      return cache.addAll(ASSETS);
    }),
  );
});

// 2. Activate Event: Cleanup Old Caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

// 3. Fetch Event: Smart Strategy
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // STRATEGY: Network-Only for Supabase (Real-time Finance Data)
  if (url.hostname.includes("supabase.co")) {
    return; // Let it go to network
  }

  // STRATEGY: Stale-While-Revalidate for UI Assets
  // This makes the app feel instant but keeps it updated
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          // Update the cache with the fresh version
          if (networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Return the cached version immediately if available, or wait for network
        return cachedResponse || fetchPromise;
      });
    }),
  );
});
