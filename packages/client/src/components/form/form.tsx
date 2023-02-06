import { Link } from 'react-router-dom';
import Input from './input';
import styles from './form.module.css';

type FormProps = {
  title: string;
  button: string;
  text: string;
};

export function Form({
  title,
  button,
  text,
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
      <fieldset className={styles.fieldset}>
        <Input
          title="Login"
          inputName="login"
          placeholder="Логин"
          type="text"
        />
        <Input
          title="Password"
          inputName="password"
          placeholder="Пароль"
          type="password"
        />
      </fieldset>
      <button type="submit" className={styles.button}>
        {button}
      </button>
      <p className={styles.linkWrapper}>
        {text}
        <Link className={styles.link} to="/registration">Регистрация</Link>
      </p>
    </form>
  );
}
