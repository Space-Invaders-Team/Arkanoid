import styles from './Field.module.css';
import { FieldProps } from './typings';

export function Field(props: FieldProps) {
  const { id, type, value, required, placeholder, onChange, disabled } = props;

  return (
    <div className={styles.field}>
      <input
        id={id}
        required={required}
        className={styles.input}
        type={type || 'text'}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
