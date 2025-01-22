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
export type ButtonShape = 'default' | 'square' | 'circle';
export type ButtonWidth = 'default' | 'wide' | 'block';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  shape?: ButtonShape;
  href?: string;
}
