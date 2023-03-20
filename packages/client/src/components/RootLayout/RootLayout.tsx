import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAppDispatch } from '../../store/hooks';
import { getUserData } from '../../store/features/authSlice';

export function RootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
  });

  return (
    <ErrorBoundary>
      <Navigation />
      <Outlet />
    </ErrorBoundary>
  );
}
