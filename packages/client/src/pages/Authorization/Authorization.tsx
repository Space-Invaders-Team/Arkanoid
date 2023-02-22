import styles from './Authorization.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';
import { LoginProps } from './typings';

export function Authorization({ onLogin }: LoginProps) {
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
