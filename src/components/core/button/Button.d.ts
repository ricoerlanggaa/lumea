import { ButtonHTMLAttributes } from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'white';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  outlined?: boolean;
  block?: boolean;
  href?: string;
}
