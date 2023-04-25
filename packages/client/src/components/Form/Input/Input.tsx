import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { InputProps } from './typings';
import styles from './Input.module.css';
import { PageType } from '../typings';

export function Input({
  inputName,
  title,
  pageType,
  errorMessage,
  handleValidate,
  inputValue,
  isOpen,
  ...inputProps
}: InputProps) {
  const [inputValues, setInputValue] = useState(inputValue);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    if (isOpen !== undefined) {
      setInputValue('');
      setInputError('');
    }
  }, [isOpen]);

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
      className={
        classNames(
          styles.field,
          { [styles.fieldTwoColumns]:
            pageType !== PageType.Signin && pageType !== PageType.Password },
        )
      }
    >
      <label htmlFor={inputName} className={styles.label}>{title}</label>
      <input
        className={classNames(styles.input, { [styles.inputError]: inputError })}
        id={inputName}
        name={inputName}
        value={inputValues || ''}
        autoComplete="off"
        onChange={(evt) => handleChange(evt)}
        {...inputProps}
      />
      <span
        className={classNames(styles.errorMessage, { [styles.active]: inputError })}
      >
        {inputError}
      </span>
    </div>
  );
}
