import styles from './Authorization.module.css';
import { Form } from '../../components/Form/Form';
import { PageType, StringObject } from '../../components/Form/typings';

export function Authorization(
  { onLogin }: { onLogin: (userData: StringObject) => void },
) {
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
