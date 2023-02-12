import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../Navbar/navbar';
import { Router } from '../../router/router';

export function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   fetchServerData();
  // }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </StrictMode>
  );
}
