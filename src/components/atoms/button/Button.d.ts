import { ButtonHTMLAttributes } from 'react';

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'black'
  | 'white';
type ButtonVariant = 'solid' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'none' | 'square' | 'circle';
type ButtonWidth = 'default' | 'wide' | 'block';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  shape?: ButtonShape;
  href?: string;
}
