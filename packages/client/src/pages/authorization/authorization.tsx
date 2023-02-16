import styles from './Authorization.module.css';
import { Form } from '../../components/Form2/Form';

export function Authorization() {
  return (
    <div className={styles.container}>
      <Form
        pageType="signin"
        title="Авторизация"
        button="Войти"
        text="Еще не зарегистрированы?"
      />
    </div>
  );
}
