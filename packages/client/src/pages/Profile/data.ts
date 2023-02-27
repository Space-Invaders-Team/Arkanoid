import { type FieldProps } from '../../components/ProfileField/Field/typings';

export const userProfileInputFields: FieldProps[] = [
  {
    title: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'test@mail.com',
    required: true,
  },
  {
    title: 'Логин',
    type: 'text',
    id: 'login',
    placeholder: 'Логин',
    required: true,
  },
  {
    title: 'Имя',
    type: 'text',
    id: 'firstName',
    placeholder: 'Имя',
  },
  {
    title: 'Фамилия',
    type: 'text',
    id: 'second_name',
    placeholder: 'Фамилия',
  },
  {
    title: 'Имя в чате',
    type: 'text',
    id: 'display_name',
    placeholder: 'Имя в чате',
  },
  {
    title: 'Телефон',
    type: 'tel',
    id: 'phone',
    placeholder: 'ivanIvanov',
  },
  {
    title: 'Текущий пароль',
    type: 'password',
    id: 'oldPassword',
    placeholder: 'Старый пароль',
  },
  {
    title: 'Новый пароль',
    type: 'password',
    id: 'newPassword',
    placeholder: 'Новый пароль',
  },
  {
    title: 'Фото',
    type: 'file',
    id: 'avatar',
    placeholder: 'Новый Аватар',
  },
];
