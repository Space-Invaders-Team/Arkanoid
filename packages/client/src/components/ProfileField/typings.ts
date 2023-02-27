import { Dispatch } from 'react';

export type FieldProps = {
  title: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  labelText?: string;
  inputHeader?: string;
  error?: string;
  pattern?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type FormHeading = { heading: string };
export type FormInputAndHeadingList = (FieldProps | FormHeading)[];

export type FieldListProps<T> = {
  fieldList: FormInputAndHeadingList;
  formData: T;
  setFormData: Dispatch<T>;
  disabled?: boolean;
};
