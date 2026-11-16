/* Gemmer web-appen på telefonen. Siden hentes altid frisk, når der er net (så nye versioner kommer med det samme),
   og fra telefonens lager, når der ikke er. Kun filer fra dette site; alt andet går direkte til nettet. */
var CACHE = 'mitboli-97ce13836f';
var CORE = ['./', 'index.html', 'manifest.webmanifest', 'pwa.js', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('mitboli-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put('index.html', copy); }); }
      return res;
    }).catch(function () { return caches.match('index.html'); }));
    return;
  }
  e.respondWith(caches.match(r).then(function (hit) { return hit || fetch(r); }));
});
