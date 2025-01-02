import { ButtonHTMLAttributes } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' | 'white';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  outlined?: boolean;
  block?: boolean;
  href?: string;
}
