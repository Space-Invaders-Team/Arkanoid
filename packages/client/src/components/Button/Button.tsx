import classNames from 'classnames';
import styles from './Button.module.css';
import { Props } from './typings';

export function Button({
  type = 'button',
  mode = 'primary',
  shape = 'button',
  disabled,
  onClick,
  extraClassName,
  children,
  text = '',
  id = '',
}: Props) {
  const className = classNames(
    { [styles.button]: shape === 'button' },
    { [styles.buttonIcon]: shape === 'icon' },
    { [styles.buttonPrimary]: mode === 'primary' },
    { [styles.buttonSecondary]: mode === 'secondary' },
    extraClassName,
  );

  return (
    <button
      id={id}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
}
