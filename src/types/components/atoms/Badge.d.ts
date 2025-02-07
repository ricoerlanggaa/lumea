import { HTMLAttributes } from 'react';

export type BadgeColor = 'success' | 'warning' | 'info' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  color?: BadgeColor;
  size?: BadgeSize;
  outline?: boolean;
}
