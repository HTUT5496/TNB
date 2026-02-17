const CACHE_NAME = "tnb-v1";
const ASSETS = [
  "index.html",
  "login-style.css",
  "login-script.js",
  "register.html",
  "register-style.css",
  "register-script.js",
  "dashboard.html",
  "dashboard.css",
  "dashboard.js",
  "reset.html",
  "reset-style.css",
  "reset-script.js",
  "manifest.json",
  "icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
