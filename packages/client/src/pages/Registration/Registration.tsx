import styles from './Registration.module.css';
import { Form } from '../../components/Form';
import { PageType } from '../../components/Form/typings';
import { RegisterProps } from './typings';

export function Registration({ onRegister }: RegisterProps) {
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
