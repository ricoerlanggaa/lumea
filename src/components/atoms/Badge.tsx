import { BadgeColor, BadgeProps, BadgeSize } from '@/types/components/atoms';
import { classNames } from '@/utilities/formats/string';

const colorClasses: Record<BadgeColor, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  info: 'badge-info',
  error: 'badge-error',
};
const sizeClasses: Record<BadgeSize, string> = {
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
};

export default function Badge({
  color = 'success',
  size = 'md',
  outline,
  className,
  children,
  ...rest
}: BadgeProps) {
  const badgeClasses = classNames(
    'badge',
    colorClasses[color],
    sizeClasses[size],
    outline && 'badge-outline',
    className,
  );
  return (
    <div className={badgeClasses} {...rest}>
      {children}
    </div>
  );
}
