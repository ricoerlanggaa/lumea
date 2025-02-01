import type { ButtonHTMLAttributes } from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'black'
  | 'white';
export type ButtonVariant = 'solid' | 'outlined' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'none' | 'square' | 'circle' | 'wide' | 'block';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  href?: string;
}
