import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAppDispatch } from '../../store/hooks';
import { getUserData } from '../../store/features/authSlice';
import { useOauth } from '../../hooks/useOauth';

export function RootLayout() {
  const dispatch = useAppDispatch();
  const { loginWithYandexId, getServiceId, getOauthCode } = useOauth();

  const handleLoad = () => {
    const element = document.body;
    element.style.opacity = '1';
  };

  useEffect(() => {
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

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
  }, [dispatch, loginWithYandexId, getOauthCode, getServiceId]);

  useEffect(() => {
  });

  return (
    <ErrorBoundary>
      <Navigation />
      <Outlet />
    </ErrorBoundary>
  );
}
