export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.ts')
        .then((registration) => {
          console.log('Service Workers successfully registered with scope:', registration.scope);
        }).catch((error: string) => {
          console.error('Service Workers registration failed:', error);
        });
    });
  }
}
