import React from 'react';
import ReactDOM from 'react-dom/client';
import '../static/vendor/normalize.css';
import './styles/fonts.css';
import './styles/properties.css';
import './index.css';
import { Provider } from 'react-redux';
import { App } from './components/App/App';
import { setupStore } from './store';
import { startServiceWorker } from './utils/serviceWorkers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);

startServiceWorker();
