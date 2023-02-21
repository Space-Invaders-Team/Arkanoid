import React from 'react';
import ReactDOM from 'react-dom/client';
import '../static/vendor/normalize.css';
import './styles/fonts.css';
import './styles/properties.css';
import './index.css';
import { App } from './components/App/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
