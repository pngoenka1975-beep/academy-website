// Rising Starz Service Worker - Offline Cache
// Replace with your real domain before production

const CACHE_NAME = 'risingstarz-v3';
const STATIC_ASSETS = [
    './index.html',
    './favicon.svg',
    './sitemap.xml',
    './robots.txt',
    './blog-neet-strategy.html',
    './blogs/blog-jee-physics.html',
    './blogs/blog-chemistry.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Skip Firebase and non-GET requests
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('firebaseio.com') || event.request.url.includes('gstatic.com')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => cache.put(event.request, responseToCache));
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback for pages
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});
