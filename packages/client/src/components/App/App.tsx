import { StrictMode, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '../../router/router';
import { Navigation } from '../Navigation';
import { authApi } from '../../api/AuthAPI';
import { StringObject } from './typings';

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

  const onLogin = (userData: StringObject): void => {
    authApi.loginUser(userData)
      .then(() => {
        setIsLogged(true);
      })
      .catch((error) => {
        switch (error) {
          case 400:
            alert('Пользователь уже в системе');
            break;
          case 401:
            alert('Неверная почта или пароль');
            break;
          default:
            alert('Что-то пошло не так! Попробуйте ещё раз');
        }
      });
  };

  const onLogout = () => {
    authApi.logoutUser()
      .then(() => {
        setIsLogged(false);
      })
      .catch(() => alert('Что-то пошло не так!'));
  };

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation isLogged={isLogged} onLogout={onLogout} />
        <Router onLogin={onLogin} />
      </BrowserRouter>
    </StrictMode>
  );
}
