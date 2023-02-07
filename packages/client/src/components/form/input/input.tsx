import { useState } from 'react';
import styles from './input.module.css';

type InputProps = {
  inputName: string;
  placeholder: string;
  type: string;
  title: string;
  pageType: string;
};

export function Input({ inputName, placeholder, type, title, pageType }: InputProps) {
  const [values, setValues] = useState({});

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div
      className={`${styles.field} ${pageType !== 'signin' && styles.fieldTwoColumns}`}
    >
      <label htmlFor={inputName} className={styles.label}>{title}</label>
      <input
        className={styles.input}
        type={type}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        value={(values as any)[inputName] || ''}
        autoComplete="off"
        onChange={handleChange}
      />
    </div>
  );
}
