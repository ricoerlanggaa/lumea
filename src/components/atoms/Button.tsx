import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import type {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonWidth,
} from '@/types/components/atoms';

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'btn',
  outlined: 'btn btn-outline border-2',
  ghost: 'btn btn-ghost',
};
const widthClasses: Record<ButtonWidth, string> = {
  default: '',
  wide: 'btn-wide',
  block: 'btn-block',
};
const shapeClasses: Record<ButtonShape, string> = {
  default: '',
  circle: 'btn-circle',
  square: 'btn-square',
};
const colorClasses: Record<ButtonColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  warning: 'btn-warning',
  info: 'btn-info',
  error: 'btn-error',
  black: 'btn-primary',
  white: 'btn-secondary',
};
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  type = 'button',
  children = 'Button',
  variant = 'solid',
  color = 'primary',
  size = 'md',
  width = 'default',
  shape = 'default',
  disabled = false,
  href,
  className,
  ...rest
}: ButtonProps) {
  const isGradientButton =
    typeof children === 'string' && (color === 'primary' || color === 'secondary');
  const buttonClasses = classNames(
    variantClasses[variant],
    colorClasses[color],
    sizeClasses[size],
    widthClasses[width],
    shapeClasses[shape],
    isGradientButton && variant === 'outlined' && 'btn-outline-gradient',
    disabled && 'btn-disabled border-none text-base-content',
    className,
  );
  const textGradientClasses = classNames(!disabled && 'text-gradient');
  return href ? (
    <Link href={href} role="button" className={buttonClasses} aria-disabled={disabled} {...rest}>
      {isGradientButton ? <span className={textGradientClasses}>{children}</span> : children}
    </Link>
  ) : (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={buttonClasses}
      disabled={disabled}
      {...rest}
    >
      {isGradientButton ? <span className={textGradientClasses}>{children}</span> : children}
    </button>
  );
}
