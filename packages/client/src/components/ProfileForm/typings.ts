import { FormEvent, type FormHTMLAttributes } from 'react';

export type FormProps = {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  handlerSubmit: (e: FormEvent<HTMLFormElement>) => void;
} & FormHTMLAttributes<HTMLFormElement>;
