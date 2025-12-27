const CACHE_NAME = 'metodo-activa-v3-elite';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/logo.jpg',
    '/manifest.json',
    '/offline.html'
];

// 1. INSTALL: Cache Critical Assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('✅ [Service Worker] Caching Critical Assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. ACTIVATE: Cleanup Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('🧹 [Service Worker] Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// 3. FETCH: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Ignorar peticiones que no sean GET o sean a extensiones de navegador
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Si es un asset válido, actualizar caché en background
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Si falla la red y no hay caché, mostrar offline page (solo para navegación)
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });

            // Devolver caché si existe, sino esperar a red
            return cachedResponse || fetchPromise;
        })
    );
});
