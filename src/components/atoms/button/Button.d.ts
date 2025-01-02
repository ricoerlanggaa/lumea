import { ButtonHTMLAttributes } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' | 'white';
type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  block?: boolean;
  href?: string;
}
