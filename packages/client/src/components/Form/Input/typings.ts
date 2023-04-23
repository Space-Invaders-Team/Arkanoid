export type InputProps = {
  inputName: string;
  placeholder: string;
  type: string;
  title: string;
  pageType: string;
  errorMessage: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  handleValidate: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string | null;
};
