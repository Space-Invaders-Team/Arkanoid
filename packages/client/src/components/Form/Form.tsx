import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Input } from './Input';
import { Button } from '../Button';
import { FormProps, PageType } from './typings';
import * as formConstants from '../../utils/formConstants';
import styles from './Form.module.css';
import { Paths } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { selectServiceId } from '../../store/selectors';

export function Form({
  title,
  button,
  text,
  pageType,
  onSubmitForm,
}: FormProps) {
  const [isValid, setIsValid] = useState(false);
  const serviceId = useAppSelector(selectServiceId);
  const redirectUri = import.meta.env?.VITE_APP_HOSTNAME;

  const handleValidate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const form = evt.target.closest('form');
    if (form !== null) setIsValid(form.checkValidity());
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

  const handleLoginWithYandexId = () => {
    window.location.assign(Paths.OAUTH_BASE_URL + serviceId + Paths.OAUTH_ADD_URL + redirectUri);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className={styles.title}>{title}</h1>
      <fieldset
        className={
          classNames(styles.fieldset, { [styles.fieldsetTwoColumns]: pageType === PageType.Signup })
        }
      >
        {pageType === PageType.Signup && (
          <>
            <Input
              title="First Name"
              inputName="first_name"
              placeholder="Имя"
              type="text"
              pageType={pageType}
              required
              pattern={formConstants.namePattern}
              errorMessage={formConstants.nameInputError}
              handleValidate={handleValidate}
            />
            <Input
              title="Second Name"
              inputName="second_name"
              placeholder="Фамилия"
              type="text"
              pageType={pageType}
              required
              pattern={formConstants.namePattern}
              errorMessage={formConstants.nameInputError}
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
          maxLength={20}
          pattern={formConstants.loginPattern}
          errorMessage={formConstants.loginInputError}
          handleValidate={handleValidate}
        />
        {pageType === PageType.Signup && (
          <Input
            title="E-mail"
            inputName="email"
            placeholder="E-mail"
            type="e-mail"
            pageType={pageType}
            required
            pattern={formConstants.emailPattern}
            errorMessage={formConstants.emailInputError}
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
          maxLength={40}
          pattern={formConstants.passwordPattern}
          errorMessage={formConstants.passwordInputError}
          handleValidate={handleValidate}
        />
        {pageType === PageType.Signup && (
          <Input
            title="Phone"
            inputName="phone"
            placeholder="Телефон"
            type="phone"
            pageType={pageType}
            required
            pattern={formConstants.phonePattern}
            errorMessage={formConstants.phoneInputError}
            handleValidate={handleValidate}
          />
        )}
      </fieldset>
      <Button
        id="btn-login"
        type="submit"
        extraClassName={classNames(styles.button, { [styles.buttonDisabled]: !isValid })}
        disabled={!isValid}
      >
        {button}
      </Button>
      <p className={styles.linkWrapper}>
        {text}
        {pageType === PageType.Signup
          ? <Link className={styles.link} to={Paths.AUTH}>Войти</Link>
          : <Link className={styles.link} to={Paths.REGISTER}>Регистрация</Link>}
      </p>
      {pageType === PageType.Signin
        && (
          <Button
            id="btn-yandex-id"
            type="button"
            extraClassName={styles.button}
            onClick={handleLoginWithYandexId}
          >
            Вход c Яндекс ID
          </Button>
        )}
    </form>
  );
}
