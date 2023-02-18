import { useState } from 'react';
import classNames from 'classnames';
import { InputProps } from './typings';
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
  const [inputValues, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { value } = evt.target;
    setInputValue(value);
    if (target.validationMessage.indexOf('формат') !== -1) {
      setInputError(errorMessage);
    } else {
      setInputError(target.validationMessage);
    }
    handleValidate(evt);
  };

  return (
    <div
      className={classNames(styles.field, { [styles.fieldTwoColumns]: pageType !== 'signin' })}
    >
      <label htmlFor={inputName} className={styles.label}>{title}</label>
      <input
        className={classNames(styles.input, { [styles.inputError]: inputError })}
        type={type}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        value={inputValues || ''}
        autoComplete="off"
        required={required}
        minLength={minLength}
        maxLength={maxlength}
        pattern={pattern}
        onChange={(evt) => handleChange(evt)}
      />
      <span
        className={classNames(styles.errorMessage, { [styles.active]: inputError })}
      >
        {inputError}
      </span>
    </div>
  );
}
