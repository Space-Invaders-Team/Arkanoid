import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { PropsWithChildren } from '../../typings';
import { selectAuthStatus, selectIsLogged } from '../../store/selectors';
import { Loader } from '../Loader';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isLogged = useAppSelector(selectIsLogged);
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    isLogged
      ? children
      : <Navigate to={Paths.AUTH} replace state={{ path: location.pathname }} />
  );
}
