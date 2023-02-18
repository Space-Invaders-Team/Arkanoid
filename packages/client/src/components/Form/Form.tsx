import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Input } from './Input/Input';
import { Button } from '../Button';
import { FormProps } from './typings';
import styles from './Form.module.css';

export function Form({
  title,
  button,
  text,
  pageType,
  onSubmitForm,
}: FormProps) {
  const [isValid, setIsValid] = useState(false);

  const handleValidate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const form = evt.target.closest('form');
    if (form !== null) {
      setIsValid(form.checkValidity());
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const fields = Array.from(document.querySelectorAll('input'));
    const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    onSubmitForm(formData);
    setIsValid(false);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className={styles.title}>{title}</h1>
      <fieldset
        className={classNames(styles.fieldset, { [styles.fieldsetTwoColumns]: pageType === 'signup' })}
      >
        {pageType === 'signup' && (
          <>
            <Input
              title="First Name"
              inputName="first_name"
              placeholder="Имя"
              type="text"
              pageType={pageType}
              required
              pattern="^[А-ЯЁA-Z]{1,}[а-яёa-z-]+$"
              errorMessage="Латиница или кириллица, первая буква заглавня, без пробелов, цифр и спецсимволов (допустим только дефис)"
              handleValidate={handleValidate}
            />
            <Input
              title="Second Name"
              inputName="second_name"
              placeholder="Фамилия"
              type="text"
              pageType={pageType}
              required
              pattern="^[А-ЯЁA-Z]{1,}[а-яёa-z-]+$"
              errorMessage="Латиница или кириллица, первая буква заглавня, без пробелов, цифр и спецсимволов (допустим только дефис)"
              handleValidate={handleValidate}
            />
          </>
        )}
        <Input
          title="Login"
          inputName="login"
          placeholder="Логин"
          type="text"
          pageType={pageType}
          required
          minLength={3}
          maxlength={20}
          pattern="^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$"
          errorMessage="Латиница, может содержать цифры, но не состоять из них, (допустимы дефис и нижнее подчёркивание)"
          handleValidate={handleValidate}
        />
        {pageType === 'signup' && (
          <Input
            title="E-mail"
            inputName="email"
            placeholder="E-mail"
            type="e-mail"
            pageType={pageType}
            required
            pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
            errorMessage="Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака»"
            handleValidate={handleValidate}
          />
        )}
        <Input
          title="Password"
          inputName="password"
          placeholder="Пароль"
          type="password"
          pageType={pageType}
          required
          minLength={8}
          maxlength={40}
          pattern="^(?=.*[0-9])(?=.*[А-ЯЁA-Z])[а-яА-ЯёЁa-zA-Z0-9]+$"
          errorMessage="Обязательно хотя бы одна заглавная буква и цифра"
          handleValidate={handleValidate}
        />
        {pageType === 'signup' && (
          <Input
            title="Phone"
            inputName="phone"
            placeholder="Телефон"
            type="phone"
            pageType={pageType}
            required
            pattern="^\+?[0-9]{10,15}$"
            errorMessage="От 10 до 15 символов, состоит из цифр, может начинаться с символа плюс."
            handleValidate={handleValidate}
          />
        )}
      </fieldset>
      <Button
        type="submit"
        extraClassName={classNames(styles.button, { [styles.buttonDisabled]: !isValid })}
        disabled={!isValid}
      >
        {button}
      </Button>
      <p className={styles.linkWrapper}>
        {text}
        {pageType === 'signup'
          ? <Link className={styles.link} to="/authorization">Войти</Link>
          : <Link className={styles.link} to="/registration">Регистрация</Link>}
      </p>
    </form>
  );
}
