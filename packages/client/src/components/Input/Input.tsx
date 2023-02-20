import classNames from 'classnames';
import styles from './Input.module.css';
import { TInput } from './typings';

export function Input(props: TInput) {
  const { classname, placeholder, name, type, onChange } = props;
  const classes = classNames(styles.input, classname);

  return (
    <input
      onChange={onChange}
      type={type}
      className={classes}
      name={name}
      placeholder={placeholder}
    />
  );
}
