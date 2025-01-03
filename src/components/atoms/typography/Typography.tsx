import { classNames } from '@/utilities/formats/string';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type {
  TypographyColor,
  TypographyElement,
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
} from './Typography.d';

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-3xl md:text-4xl lg:text-5xl leading-tight',
  h2: 'text-2xl md:text-3xl lg:text-4xl leading-snug',
  h3: 'text-xl md:text-2xl lg:text-3xl leading-snug',
  h4: 'text-lg md:text-xl lg:text-2xl leading-relaxed',
  h5: 'text-base md:text-lg lg:text-xl leading-relaxed',
  h6: 'text-sm md:text-base lg:text-lg leading-relaxed',
  'body-large': 'text-base md:text-lg leading-relaxed',
  body: 'text-sm md:text-base leading-relaxed',
  'body-small': 'text-xs md:text-sm leading-normal',
  caption: 'text-xs leading-tight tracking-wide',
};
const colorClasses: Record<TypographyColor, string> = {
  base: 'text-base-content',
  primary: 'bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF]',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  error: 'text-error',
};
const weightClasses: Record<TypographyWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};
const defaultComponent: Record<TypographyVariant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-large': 'p',
  body: 'p',
  'body-small': 'p',
  caption: 'span',
};

export default function Typography<T extends ElementType = 'p'>({
  variant = 'body',
  as,
  color,
  weight,
  italic,
  className,
  children,
  ...rest
}: TypographyProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as ?? defaultComponent[variant];
  const classes = classNames(
    variantClasses[variant],
    color && colorClasses[color],
    weight && weightClasses[weight],
    italic && 'italic',
    className,
  );
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
