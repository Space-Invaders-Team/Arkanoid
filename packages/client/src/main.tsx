import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/colors.css';
import './styles/index.css';
import { LeaderBoard } from './pages/Leaderboard/Leaderboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <LeaderBoard />
  </React.StrictMode>,
);
