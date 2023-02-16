import styles from './Registration.module.css';
import { Form } from '../../components/Form2/Form';

export function Registration() {
  return (
    <div className={styles.container}>
      <Form
        pageType="signup"
        title="Регистрация"
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
      />
    </div>
  );
}
