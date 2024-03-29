import * as formConstants from './formConstants';

export const inputData = {
  firstName: {
    title: 'First Name',
    inputName: 'first_name',
    placeholder: 'Имя',
    type: 'text',
    pattern: formConstants.namePattern,
    errorMessage: formConstants.nameInputError,
    required: true,
  },
  secondName: {
    title: 'Second Name',
    inputName: 'second_name',
    placeholder: 'Фамилия',
    type: 'text',
    pattern: formConstants.namePattern,
    errorMessage: formConstants.nameInputError,
    required: true,
  },
  login: {
    title: 'Login',
    inputName: 'login',
    placeholder: 'Логин',
    type: 'text',
    pattern: formConstants.loginPattern,
    errorMessage: formConstants.loginInputError,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  email: {
    title: 'E-mail',
    inputName: 'email',
    placeholder: 'E-mail',
    type: 'e-mail',
    pattern: formConstants.emailPattern,
    errorMessage: formConstants.emailInputError,
    required: true,
  },
  password: {
    title: 'Password',
    inputName: 'password',
    placeholder: 'Пароль',
    type: 'password',
    pattern: formConstants.passwordPattern,
    errorMessage: formConstants.passwordInputError,
    minLength: 8,
    maxLength: 40,
    required: true,
  },
  passwordOld: {
    title: 'Old Password',
    inputName: 'oldPassword',
    placeholder: 'Старый пароль',
    type: 'password',
    pattern: formConstants.passwordPattern,
    errorMessage: formConstants.passwordInputError,
    minLength: 8,
    maxLength: 40,
    required: true,
  },
  passwordNew: {
    title: 'New Password',
    inputName: 'newPassword',
    placeholder: 'Новый пароль',
    type: 'password',
    pattern: formConstants.passwordPattern,
    errorMessage: formConstants.passwordInputError,
    minLength: 8,
    maxLength: 40,
    required: true,
  },
  displayName: {
    title: 'Display Name',
    inputName: 'display_name',
    placeholder: 'Никнейм',
    type: 'text',
    errorMessage: '',
  },
  phone: {
    title: 'Phone',
    inputName: 'phone',
    placeholder: 'Телефон',
    type: 'phone',
    pattern: '^(\\+7)?[0-9]{10,13}$',
    errorMessage: 'От 10 до 13 символов, состоит из цифр, может начинаться с +7',
    required: true,
  },
};
