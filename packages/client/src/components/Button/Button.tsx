import classNames from 'classnames';
import styles from './Button.module.css';
import { Props } from './typings';

export function Button({
  type = 'button',
  mode = 'primary',
  onClick,
  extraClassName,
  children,
}: Props) {
  const className = classNames(
    styles.button,
    { [styles.buttonPrimary]: mode === 'primary' },
    { [styles.buttonSecondary]: mode === 'secondary' },
    extraClassName,
  );

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
