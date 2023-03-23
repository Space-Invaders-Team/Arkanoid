import styles from './Authorization.module.css';
import { Form } from '../../components/Form';
import { AuthMessage } from '../../components/AuthMessage';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';

export function Authorization() {
  const { onLogin, isErrorMessage } = useAuth();

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signin}
        title="Авторизация"
        button="Вход по логину и паролю"
        text="Еще не зарегистрированы?"
        onSubmitForm={onLogin}
      />
      {isErrorMessage && <AuthMessage message={isErrorMessage} />}
    </div>
  );
}
