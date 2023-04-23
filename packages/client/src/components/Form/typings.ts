import { UserData } from '../../store/typings';

export type FormProps = {
  title: string;
  button: string;
  text: string;
  pageType: PageType;
  onSubmitForm(formData: StringObject): void;
  userData?: UserData | null;
};

export enum PageType {
  Signin = 'signin',
  Signup = 'signup',
  Profile = 'profile',
}
