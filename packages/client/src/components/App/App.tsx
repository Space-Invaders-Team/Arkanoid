import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '../../router/router';
import { Navigation } from '../Navigation';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserData } from '../../store/features/authSlice';
import { Loader } from '../Loader';
import { selectAuthStatus } from '../../store/selectors';
import { useOauth } from '../../hooks/useOauth';

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
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const { loginWithYandexId, getServiceId, getOauthCode } = useOauth();

  useEffect(() => {
    const fetch = async () => {
      await getServiceId();
      const code = getOauthCode();
      if (code) {
        await loginWithYandexId(code);
      }
      await dispatch(getUserData());
    };
    fetch();
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {status === 'loading'
          ? <Loader />
          : (
            <>
              <Navigation />
              <Router />
            </>
          )}
      </ErrorBoundary>
    </BrowserRouter>
  );
}
