export declare const self: ServiceWorkerGlobalScope;

/**
 * CACHE_NAME - меняем значение константы,
 * если хотим скинуть кеш
 */
const CACHE_NAME = 'space-invaders-cache-v1';

const URLS = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/assets/icons/close.svg',
  '/assets/icons/downDouble.svg',
  '/assets/icons/moon.svg',
  '/assets/icons/sun.svg',
  '/assets/img/arkanoid-title.png',
  '/assets/img/game.png',
  '/assets/img/listScreen.png',
  '/assets/img/logo.webp',
  '/assets/img/space-bg.jpg',
  '/assets/img/spaceMM.png',
];

const initCache = () => caches.open(CACHE_NAME)
  .then((cache) => cache.addAll(URLS))
  .catch((error) => {
    console.log(error);
  });

const tryFetch = (request: Request, time: number): Promise<Response> => {
  console.log('tryFetch: ', request);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, time);
    fetch(request).then((res) => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
      resolve(res);
    }, reject);
  });
};

const getDataFromCache = (request: Request): Response | PromiseLike<Response> => {
  console.log('getDataFromCache: ');
  return caches.open(CACHE_NAME).then((cache) => cache.match(request)
    .then((result) => result)
    .catch((error) => error));
};

self.addEventListener('install', (e: ExtendableEvent) => {
  console.log('sw installed, initCache called');
  e.waitUntil(initCache());
});

self.addEventListener('activate', (e: ExtendableEvent) => {
  console.log('sw activated');
  e.waitUntil(
    caches.keys().then((keyList) => {
      Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return true;
      }));
    }),
  );
});

self.addEventListener('fetch', (e: FetchEvent) => {
  e.respondWith(tryFetch(e.request, 500).catch(() => getDataFromCache(e.request)));
});
