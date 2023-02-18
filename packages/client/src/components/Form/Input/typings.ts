export type InputProps = {
  inputName: string;
  placeholder: string;
  type: string;
  title: string;
  pageType: string;
  errorMessage: string;
  required: boolean;
  minLength?: number;
  maxlength?: number;
  pattern: string;
  handleValidate: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};
