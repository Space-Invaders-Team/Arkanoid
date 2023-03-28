export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Workers successfully registered with scope:', registration.scope);
        }).catch((error: string) => {
          console.error('Service Workers registration failed:', error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    console.log('Отключаем регистрацию SW', registrations);

    registrations.forEach((registration) => {
      registration.unregister();
      console.log('SW unregistered: ', registration);
    });
  });
}
