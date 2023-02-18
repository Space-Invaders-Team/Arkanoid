import styles from './Registration.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';

export function Registration() {
  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signup}
        title="Регистрация"
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
      />
    </div>
  );
}
