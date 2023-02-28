export type FieldProps = {
  title: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  label?: string;
  inputHeader?: string;
  error?: string;
  pattern?: string;
  errorMessage: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
