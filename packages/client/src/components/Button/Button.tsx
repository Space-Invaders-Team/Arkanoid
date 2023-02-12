import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type Props = {
  onClick(): void,
  extraClassName?: string,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  children?: ReactNode,
};

export function Button({ type = 'button', onClick, extraClassName, children }: Props) {
  const className = classNames(styles.button, extraClassName);

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
