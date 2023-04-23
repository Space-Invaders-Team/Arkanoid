import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Input } from './Input';
import { Button } from '../Button';
import { FormProps, PageType } from './typings';
import styles from './Form.module.css';
import { Paths } from '../../utils/routeConstants';
import { useAppSelector } from '../../store/hooks';
import { selectServiceId } from '../../store/selectors';
import { inputData } from '../../utils/formData';

export function Form({
  title,
  button,
  text,
  pageType,
  onSubmitForm,
  userData,
  btnId,
  isOpen,
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
      className={classNames(
        styles.form,
        { [styles.formProfile]: pageType === PageType.Profile },
        { [styles.formPassword]: pageType === PageType.Password },
      )}
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className={styles.title}>{title}</h1>
      <fieldset
        className={
          classNames(
            styles.fieldset,
            { [styles.fieldsetTwoColumns]:
              pageType !== PageType.Signin && pageType !== PageType.Password },
          )
        }
      >
        {pageType !== PageType.Signin && pageType !== PageType.Password && (
          <>
            <Input
              {...inputData.firstName}
              pageType={pageType}
              handleValidate={handleValidate}
              inputValue={pageType === PageType.Profile ? userData && userData.first_name : ''}
            />
            <Input
              {...inputData.secondName}
              pageType={pageType}
              handleValidate={handleValidate}
              inputValue={pageType === PageType.Profile ? userData && userData.second_name : ''}
            />
          </>
        )}
        {pageType !== PageType.Password && (
          <Input
            {...inputData.login}
            pageType={pageType}
            handleValidate={handleValidate}
            inputValue={pageType === PageType.Profile ? userData && userData.login : ''}
          />
        )}
        {pageType !== PageType.Signin && pageType !== PageType.Password && (
          <Input
            {...inputData.email}
            pageType={pageType}
            handleValidate={handleValidate}
            inputValue={pageType === PageType.Profile ? userData && userData.email : ''}
          />
        )}
        {pageType !== PageType.Profile && pageType !== PageType.Password && (
          <Input
            {...inputData.password}
            pageType={pageType}
            handleValidate={handleValidate}
          />
        )}
        {pageType === PageType.Password && (
          <Input
            {...inputData.passwordOld}
            pageType={pageType}
            handleValidate={handleValidate}
            isOpen={isOpen}
          />
        )}
        {pageType === PageType.Password && (
          <Input
            {...inputData.passwordNew}
            pageType={pageType}
            handleValidate={handleValidate}
            isOpen={isOpen}
          />
        )}
        {pageType === PageType.Profile && (
          <Input
            {...inputData.displayName}
            pageType={pageType}
            handleValidate={handleValidate}
            inputValue={pageType === PageType.Profile ? userData && userData.display_name : ''}
          />
        )}
        {pageType !== PageType.Signin && pageType !== PageType.Password && (
          <Input
            {...inputData.phone}
            pageType={pageType}
            handleValidate={handleValidate}
            inputValue={pageType === PageType.Profile ? userData && userData.phone : ''}
          />
        )}
      </fieldset>
      <Button
        id={btnId}
        type="submit"
        extraClassName={classNames(styles.button, { [styles.buttonDisabled]: !isValid })}
        disabled={!isValid}
      >
        {button}
      </Button>
      {pageType !== PageType.Profile && pageType !== PageType.Password
        && (
          <p className={styles.linkWrapper}>
            {text}
            {
              pageType === PageType.Signup
              && <Link className={styles.link} to={Paths.AUTH}>Войти</Link>
            }
            {
              pageType === PageType.Signin
              && <Link className={styles.link} to={Paths.REGISTER}>Регистрация</Link>
            }
          </p>
        )}
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
