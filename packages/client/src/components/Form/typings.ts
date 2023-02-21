import { StringObject } from '../../typings';

export type FormProps = {
  title: string;
  button: string;
  text: string;
  pageType: PageType;
  onSubmitForm(formData: StringObject): void;
};

export enum PageType {
  Signin = 'signin',
  Signup = 'signup',
}
