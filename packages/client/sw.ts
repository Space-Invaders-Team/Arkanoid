export declare const self: ServiceWorkerGlobalScope;

/**
 * CACHE_NAME - меняем значение константы,
 * если хотим скинуть кеш
 */
const CACHE_NAME = 'space-invaders-cache-v5';

const URLS = ['/', '/index.html'];

const initCache = () => caches
  .open(CACHE_NAME)
  // собираем и кешируем статику
  .then((cache) => cache.addAll(URLS))
  .then(() => {
    self.skipWaiting(); // для активации кеша сразу, без перезагрузки страницы
    console.log('sw cache added');
  })
  .catch((error) => {
    console.log(error);
  });

const tryFetch = (request: Request, time: number): Promise<Response> => new Promise(
  (resolve, reject) => {
    const timeoutId = setTimeout(reject, time);
    fetch(request).then((res) => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
      resolve(res);
    }, reject);
  },
);

const getDataFromCache = (request: Request): Response | PromiseLike<Response> => caches
  .open(CACHE_NAME)
  .then((cache) => cache.match(request)
    .then((result) => result)
    .catch((error) => error));

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
  // Исключаем POST-запросы, т.к. SW их не кешируют
  if (e.request.method === 'POST') {
    return;
  }

  // Исключаем запросы chrome-extension://
  if (!e.request.url.startsWith('http')) {
    return;
  }
  e.respondWith(tryFetch(e.request, 500).catch(() => getDataFromCache(e.request)));
});
