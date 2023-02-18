import styles from './Registration.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';
import { authApi } from '../../api/AuthAPI';
import { StringObject } from './typings';

export function Registration() {
  const onRegister = (userData: StringObject) => {
    authApi.registerUser(userData)
      .then(() => {
        alert('Регистрация прошла успешно');
      })
      .catch((error) => {
        if (error === 409) {
          alert('Пользователем с такими e-mail уже существует');
        } else {
          alert('Что-то пошло не так! Попробуйте ещё раз');
        }
      });
  };

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
