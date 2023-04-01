import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Authorization.module.css';
import { Form } from '../../components/Form';
import { AuthMessage } from '../../components/AuthMessage';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';
// import { Paths } from '../../utils/routeConstants';

export function Authorization() {
  const { onLogin, errorMessage } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = (userData: StringObject) => {
    // TODO: Разобраться с выводом ошибок и редиректом после авторизации
    // onLogin(userData).then(() => navigate(state?.path || Paths.HOME));
    onLogin(userData).then(() => navigate(state?.path));
  };

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signin}
        title="Авторизация"
        button="Вход по логину и паролю"
        text="Еще не зарегистрированы?"
        onSubmitForm={handleLogin}
      />
      {errorMessage && <AuthMessage message={errorMessage} />}
    </div>
  );
}
