import styles from './Registration.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';
import { StringObject } from './typings';

export function Registration(
  { onRegister }: { onRegister: (userData: StringObject) => void },
) {
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
