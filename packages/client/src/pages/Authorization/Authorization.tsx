import styles from './Authorization.module.css';
import { Form } from '../../components/Form/Form';
import { PageType } from '../../components/Form/typings';
import { authApi } from '../../api/AuthAPI';
import { StringObject } from './typings';

export function Authorization() {
  const onLogin = (userData: StringObject) => {
    authApi.loginUser(userData)
      .then(() => {
        alert('Авторизация прошла успешно');
      })
      .catch((error) => {
        switch (error) {
          case 400:
            alert('Пользователь уже в системе');
            break;
          case 401:
            alert('Неверная почта или пароль');
            break;
          default:
            alert('Что-то пошло не так! Попробуйте ещё раз');
        }
      });
  };

  return (
    <div className={styles.container}>
      <Form
        pageType={PageType.Signin}
        title="Авторизация"
        button="Войти"
        text="Еще не зарегистрированы?"
        onSubmitForm={onLogin}
      />
    </div>
  );
}
