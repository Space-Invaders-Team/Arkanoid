import { StrictMode, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '../../router/router';
import { Navigation } from '../Navigation';
import { authApi } from '../../api/AuthAPI';
import { StringObject } from './typings';
import * as errorConstants from '../../utils/errorConstants';

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
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      authApi.checkToken()
        .then((data) => {
          if (data) { setIsLogged(true); }
        })
        .catch(() => alert(errorConstants.SERVER_ERROR_MESSAGE));
    }
  }, []);

  const onLogin = async (userData: StringObject) => {
    try {
      await authApi.loginUser(userData);
      localStorage.setItem('isLogged', 'true');
      setIsLogged(true);
    } catch (error) {
      if (error === errorConstants.AUTH_ERROR_CODE) {
        alert(errorConstants.AUTH_ERROR_MESSAGE);
      } else {
        alert(errorConstants.SERVER_ERROR_MESSAGE);
      }
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logoutUser();
      localStorage.removeItem('isLogged');
      setIsLogged(false);
    } catch {
      alert(errorConstants.SERVER_ERROR_MESSAGE);
    }
  };

  const onRegister = async (userData: StringObject) => {
    try {
      await authApi.registerUser(userData);
      localStorage.setItem('isLogged', 'true');
      setIsLogged(true);
      alert(errorConstants.SUCCESSFUL_REGISTRATION_MESSAGE);
    } catch (error) {
      if (error === errorConstants.CONFLICT_ERROR_CODE) {
        alert(errorConstants.CONFLICT_ERROR_MESSAGE);
      } else {
        alert(errorConstants.SERVER_ERROR_MESSAGE);
      }
    }
  };

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation
          isLogged={isLogged}
          onLogout={onLogout}
        />
        <Router
          isLogged={isLogged}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      </BrowserRouter>
    </StrictMode>
  );
}
