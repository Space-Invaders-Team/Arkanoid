import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  text: string,
  onClick: () => void,
  extraClassName?: string,
};

export function Button({ type = 'button', text, onClick, extraClassName }: Props) {
  const className = classNames(styles.button, extraClassName);

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
