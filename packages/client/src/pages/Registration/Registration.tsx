import styles from './Registration.module.css';
import { Form } from '../../components/Form';
import { AuthMessage } from '../../components/AuthMessage';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';

export function Registration() {
  const { onRegister, errorMessage } = useAuth();

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signup}
        title="Регистрация"
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        onSubmitForm={onRegister}
      />
      {errorMessage && <AuthMessage message={errorMessage} />}
    </div>
  );
}
