import classNames from 'classnames';
import styles from './Field.module.css';
import { FieldProps } from './typings';

export function Field(props: FieldProps) {
  const { id, title, type, value, required, placeholder, onChange, disabled } = props;

  return (
    <div className={classNames(styles.field, styles.fieldTwoColumns)}>

      <label htmlFor={id} className={styles.label}>{title}</label>
      <input
        className={styles.input}
        id={id}
        required={required}
        type={type}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
