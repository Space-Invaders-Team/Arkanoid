import styles from './Registration.module.css';
import { Form } from '../../components/Form';
import { PageType } from '../../components/Form/typings';
import { useAuth } from '../../hooks/useAuth';

export function Registration() {
  const { onRegister } = useAuth();

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signup}
        title="Регистрация"
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        onSubmitForm={onRegister}
      />
    </div>
  );
}
