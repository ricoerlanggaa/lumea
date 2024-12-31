import { classNames } from '@/utilities/formats/string';
import Link from 'next/link';
import type { ButtonColor, ButtonSize, ButtonProps } from './Button.d';

const colorClasses: Record<ButtonColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  warning: 'btn-warning',
  info: 'btn-info',
  error: 'btn-error',
  white: 'btn-white',
};
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  type = 'button',
  children = 'Button',
  color = 'primary',
  size = 'md',
  outlined,
  block,
  disabled,
  href,
  ...rest
}: ButtonProps) {
  const isGradientButton = color === 'primary' || color === 'secondary';
  const buttonClasses = classNames(
    'btn',
    colorClasses[color],
    sizeClasses[size],
    outlined && 'btn-outline border-2',
    outlined && isGradientButton && 'gradient-border',
    block && 'btn-block',
    disabled && 'btn-disabled',
  );
  const textClasses = classNames(
    isGradientButton &&
      'bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF]',
  );
  if (href) {
    return (
      <Link {...rest} href={href} role="button" className={buttonClasses}>
        <span className={textClasses}>{children}</span>
      </Link>
    );
  }
  return (
    <button
      {...rest}
      type={type === 'submit' ? 'submit' : 'button'}
      className={buttonClasses}
      disabled={disabled}
    >
      <span className={textClasses}>{children}</span>
    </button>
  );
}
