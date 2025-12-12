// SELF-DESTRUCT SERVICE WORKER (KILL SWITCH)
// This script unregisters itself to remove PWA functionality and clear the cache loop.

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        self.registration.unregister()
            .then(() => {
                console.log('Service Worker: Self-Destruct Successful. Unregistered.');
                return self.clients.matchAll();
            })
            .then((clients) => {
                clients.forEach(client => client.navigate(client.url)); // Force reload page to clear memory
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Pass through everything while dying
    event.respondWith(fetch(event.request));
});
