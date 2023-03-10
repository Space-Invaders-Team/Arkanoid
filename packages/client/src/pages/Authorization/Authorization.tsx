import styles from './Authorization.module.css';
import { Form } from '../../components/Form';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';

export function Authorization() {
  const { onLogin } = useAuth();

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signin}
        title="Авторизация"
        button="Войти"
        text="Еще не зарегистрированы?"
        onSubmitForm={onLogin}
      />
    </div>
  );
}
