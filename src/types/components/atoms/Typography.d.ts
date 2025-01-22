import type { ElementType, JSX } from 'react';

export type TypographyElement = keyof JSX.IntrinsicElements;
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-large'
  | 'body'
  | 'body-small'
  | 'caption';
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographyColor =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export interface TypographyProps<T extends ElementType = 'p'> {
  as?: T;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  italic?: boolean;
  color?: TypographyColor;
}
