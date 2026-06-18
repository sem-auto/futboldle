const CACHE = "futboldle-shell-v1";
const SHELL = ["/", "/icon.png", "/og-image.png", "/manifest.webmanifest"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(response => response || caches.match("/"))));
});
self.addEventListener("notificationclick", event => { event.notification.close(); event.waitUntil(self.clients.openWindow("/")); });
