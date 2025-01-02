import type { ElementType, JSX } from 'react';

type TypographyElement = keyof JSX.IntrinsicElements;
type TypographyVariant =
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
type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyColor = 'base' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';

interface TypographyProps<T extends ElementType = 'p'> {
  as?: T;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  italic?: boolean;
  color?: TypographyColor;
}
