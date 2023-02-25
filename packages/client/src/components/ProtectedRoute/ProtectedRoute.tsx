import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '../../utils/routeConstants';

export function ProtectedRoute() {
  const isLogged = localStorage.getItem('isLogged');
  return (
    isLogged ? <Outlet /> : <Navigate to={Paths.HOME} replace />
  );
}
