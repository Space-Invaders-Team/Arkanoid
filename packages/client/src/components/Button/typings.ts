import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type Props = {
  onClick?(): void,
  extraClassName?: string,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  children?: ReactNode,
  disabled?: boolean,
  mode?: 'primary' | 'secondary' | 'icon';
};
