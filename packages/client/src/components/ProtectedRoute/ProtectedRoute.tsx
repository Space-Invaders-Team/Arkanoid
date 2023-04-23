import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { selectIsLogged } from '../../store/selectors';
import { PropsWithChildren } from '../../typings';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isLogged = useAppSelector(selectIsLogged);
  const location = useLocation();

  return (
    isLogged
      ? children
      : <Navigate to={Paths.AUTH} replace state={{ path: location.pathname }} />
  );
}
