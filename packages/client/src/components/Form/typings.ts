export type FormProps = {
  title: string;
  button: string;
  text: string;
  pageType: PageType;
};

export enum PageType {
  Signin = 'signin',
  Signup = 'signup',
}
