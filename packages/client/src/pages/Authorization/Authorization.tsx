import styles from './Authorization.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';

export function Authorization() {
  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signin}
        title="Авторизация"
        button="Войти"
        text="Еще не зарегистрированы?"
      />
    </div>
  );
}
