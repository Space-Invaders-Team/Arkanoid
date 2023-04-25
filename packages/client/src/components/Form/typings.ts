import { StringObject } from '../../typings';
import { UserData } from '../../store/typings';

export type FormProps = {
  title: string;
  button: string;
  text?: string;
  pageType: PageType;
  onSubmitForm(formData: StringObject): void;
  userData?: UserData | null;
  btnId: string;
  isOpen?: boolean;
};

export enum PageType {
  Signin = 'signin',
  Signup = 'signup',
  Profile = 'profile',
  Password = 'password',
}
