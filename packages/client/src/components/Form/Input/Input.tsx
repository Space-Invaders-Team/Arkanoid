import { useState } from 'react';
import classNames from 'classnames';
import { StringObject, InputProps } from './typings';
import styles from './Input.module.css';

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
  handleValidate,
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
    handleValidate(evt);
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
        onChange={(evt) => handleChange(evt)}
      />
      <span
        className={classNames(styles.errorMessage, { [styles.active]: errors[inputName] })}
      >
        {errors[inputName]}
      </span>
    </div>
  );
}
