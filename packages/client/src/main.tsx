import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../static/vendor/normalize.css';
import './styles/fonts.css';
import './styles/properties.css';
import './index.css';
import { routes } from './router/router';
import { setupStore } from './store';
import { registerServiceWorker, unregisterServiceWorker } from './utils/serviceWorkers';

const router = createBrowserRouter(routes);
const store = setupStore();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  ),
);

/**
 * Регистрируем ServiceWorker только в production-режиме
 */

if (process.env.NODE_ENV === 'development') {
  unregisterServiceWorker();
} else {
  registerServiceWorker();
}
