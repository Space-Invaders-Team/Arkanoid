import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const isLogged = localStorage.getItem('isLogged');
  return (
    isLogged ? <Outlet /> : <Navigate to="/" replace />
  );
}
