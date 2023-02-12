import { useState } from 'react';
import styles from './Input.module.css';

type InputProps = {
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
};

interface StringObject {
  [key:string]: string
}

export function Input({
  inputName,
  placeholder,
  type,
  title,
  pageType,
  errorMessage,
  required,
  minLength,
  maxlength,
  pattern,
}: InputProps) {
  const [values, setValues] = useState<StringObject>({});
  const [errors, setErrors] = useState<StringObject>({});

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    if (target.validationMessage.indexOf('формат') !== -1) {
      setErrors({ ...errors, [name]: errorMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };

  return (
    <div
      className={`${styles.field} ${pageType !== 'signin' && styles.fieldTwoColumns}`}
    >
      <label htmlFor={inputName} className={styles.label}>{title}</label>
      <input
        className={`${styles.input} ${errors[inputName] && styles.inputError}`}
        type={type}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        value={values[inputName] || ''}
        autoComplete="off"
        required={required}
        minLength={minLength}
        maxLength={maxlength}
        pattern={pattern}
        onChange={handleChange}
      />
      <span className={`${styles.errorMessage} ${errors[inputName] && styles.active}`}>
        {errors[inputName]}
      </span>
    </div>
  );
}
