export const namePattern = '^[А-ЯЁA-Z]{1,}[а-яёa-z-]+$';
export const loginPattern = '^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$';
export const emailPattern = '^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$';
export const passwordPattern = '^(?=.*[0-9])(?=.*[А-ЯЁA-Z])[а-яА-ЯёЁa-zA-Z0-9]+$';
export const phonePattern = '^(\\+7)?[0-9]{10,13}$';

export const nameInputError = 'Латиница или кириллица, первая буква заглавня, без пробелов, цифр и спецсимволов (допустим только дефис)';
export const loginInputError = 'Латиница, может содержать цифры, но не состоять из них, (допустимы дефис и нижнее подчёркивание)';
export const emailInputError = 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака»';
export const passwordInputError = 'Обязательно хотя бы одна заглавная буква и цифра';
export const phoneInputError = 'От 10 до 13 символов, состоит из цифр, может начинаться с +7';
