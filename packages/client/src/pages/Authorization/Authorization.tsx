import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Authorization.module.css';
import { Form } from '../../components/Form';
import { AuthMessage } from '../../components/AuthMessage';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../store/hooks';
import { selectIsLogged } from '../../store/selectors';
import { Paths } from '../../utils/routeConstants';

export function Authorization() {
  const { onLogin, errorMessage } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isLogged = useAppSelector(selectIsLogged);

  useEffect(() => {
    if (isLogged) {
      navigate(state?.path || Paths.HOME);
    }
  }, [isLogged, navigate, state?.path]);

  return (
    <div className={styles.container}>
      <Form
        btnId="btn-auth"
        pageType={PageType.Signin}
        title="Авторизация"
        button="Вход по логину и паролю"
        text="Еще не зарегистрированы?"
        onSubmitForm={onLogin}
      />
      {errorMessage && <AuthMessage message={errorMessage} />}
    </div>
  );
}
