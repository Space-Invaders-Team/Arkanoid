import classNames from 'classnames';
import styles from './Button.module.css';
import { Props } from './typings';

export function Button({
  type = 'button',
  mode = 'primary',
  disabled,
  onClick,
  extraClassName,
  children,
}: Props) {
  const className = classNames(
    { [styles.button]: !(mode === 'icon') },
    { [styles.buttonPrimary]: mode === 'primary' },
    { [styles.buttonSecondary]: mode === 'secondary' },
    { [styles.buttonIcon]: mode === 'icon' },
    extraClassName,
  );

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
