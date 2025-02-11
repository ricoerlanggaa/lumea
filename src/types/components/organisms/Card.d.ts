import type { HTMLAttributes } from 'react';

export type CardBackgroundColor = 'base' | 'primary';
export interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  bgColor?: CardBackgroundColor;
}
