import { type ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
  fallback?: ReactNode;
};

export type TState = {
  error: Error | null;
};
