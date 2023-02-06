import styles from './registration.module.css';
import Form from '../../components/form';

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
