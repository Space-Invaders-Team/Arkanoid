import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { startServiceWorker } from './utils/serviceWorkers';
import '../static/vendor/normalize.css';
import './styles/fonts.css';
import './styles/properties.css';
import './index.css';
import { browserRoutes } from './router/router';
import { App } from './components/App';

const router = createBrowserRouter(browserRoutes);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  (
    <App>
      <RouterProvider router={router} />
    </App>
  ),
);

startServiceWorker();
