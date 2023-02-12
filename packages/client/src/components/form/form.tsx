import { Link } from 'react-router-dom';
import { Input } from './Input/Input';
import styles from './form.module.css';

type FormProps = {
  title: string;
  button: string;
  text: string;
  pageType: string;
};

export function Form({
  title,
  button,
  text,
  pageType,
}: FormProps) {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log('Форма отправлена');
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className={styles.title}>{title}</h1>
      <fieldset
        className={`${styles.fieldset} ${pageType === 'signup' && styles.fieldsetTwoColumns}`}
      >
        {pageType === 'signup' && (
          <>
            <Input
              title="First Name"
              inputName="first_name"
              placeholder="Имя"
              type="text"
              pageType={pageType}
            />
            <Input
              title="Second Name"
              inputName="second_name"
              placeholder="Фамилия"
              type="text"
              pageType={pageType}
            />
          </>
        )}
        <Input
          title="Login"
          inputName="login"
          placeholder="Логин"
          type="text"
          pageType={pageType}
        />
        {pageType === 'signup' && (
          <Input
            title="E-mail"
            inputName="email"
            placeholder="E-mail"
            type="e-mail"
            pageType={pageType}
          />
        )}
        <Input
          title="Password"
          inputName="password"
          placeholder="Пароль"
          type="password"
          pageType={pageType}
        />
        {pageType === 'signup' && (
          <Input
            title="Phone"
            inputName="phone"
            placeholder="Телефон"
            type="phone"
            pageType={pageType}
          />
        )}
      </fieldset>
      <button type="submit" className={styles.button}>
        {button}
      </button>
      <p className={styles.linkWrapper}>
        {text}
        {pageType === 'signup'
          ? <Link className={styles.link} to="/authorization">Войти</Link>
          : <Link className={styles.link} to="/registration">Регистрация</Link>}
      </p>
    </form>
  );
}
