import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus, selectIsLogged } from '../../store/selectors';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isLogged = useAppSelector(selectIsLogged);
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);

  if (status === 'loading') {
    return null;
  }

  return (
    isLogged
      ? children
      : <Navigate to={Paths.AUTH} replace state={{ path: location.pathname }} />
  );
}
