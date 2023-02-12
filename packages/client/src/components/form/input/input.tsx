import { useState } from 'react';
import classNames from 'classnames';
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

type StringObject = {
  [key:string]: string
};

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
      className={classNames(styles.field, { [styles.fieldTwoColumns]: pageType !== 'signin' })}
    >
      <label htmlFor={inputName} className={styles.label}>{title}</label>
      <input
        className={classNames(styles.input, { [styles.inputError]: errors[inputName] })}
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
      <span className={classNames(styles.errorMessage, { [styles.active]: errors[inputName] })}>
        {errors[inputName]}
      </span>
    </div>
  );
}
