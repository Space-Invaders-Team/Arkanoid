import { Dispatch } from 'react';
import { type FieldProps } from './Field/typings';

export type FieldListProps<T> = {
  fieldList: (FieldProps)[];
  formData: T;
  setFormData: Dispatch<T>;
  disabled?: boolean;
  label?: string;
};
