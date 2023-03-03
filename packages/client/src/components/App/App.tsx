import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '../../router/router';
import { Navigation } from '../Navigation';
import { ErrorBoundary } from '../ErrorBoundary';

// useEffect(() => {
//   const fetchServerData = async () => {
//     const url = `http://localhost:${__SERVER_PORT__}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   };

//   fetchServerData();
// }, []);

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <Navigation />
          <Router />
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
}
