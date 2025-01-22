'use client';

import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import type {
  MenuBackgrounColor,
  MenuItem,
  MenuProps,
  MenuSize,
} from '@/types/components/molecules';

const bgColorClasses: Record<MenuBackgrounColor, string> = {
  base: 'bg-base-200 text-base-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
};
const sizeClasses: Record<MenuSize, string> = {
  sm: 'menu-sm',
  md: 'menu-md',
  lg: 'menu-lg',
};

export default function Menu({ orientation, items, bgColor, size, className, ...rest }: MenuProps) {
  const menuClasses = classNames(
    'menu',
    size && sizeClasses[size],
    bgColor && bgColorClasses[bgColor],
    orientation === 'horizontal' ? 'menu-horizontal' : 'menu-vertical',
    className,
  );
  const checkActiveChild = (item: MenuItem[][number]): boolean => {
    if (item.status === 'active') return true;
    if (item.children) {
      return item.children.some(checkActiveChild);
    }
    return false;
  };
  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item) => {
      const itemClasses = classNames(item.status === 'disabled' && 'disabled');
      const linkClasses = classNames(item.status === 'active' && 'focus');
      const hasActiveChild = item.children?.some((child) => checkActiveChild(child));
      if (item.children) {
        return (
          <li key={item.label}>
            <details open={hasActiveChild}>
              <summary aria-expanded={hasActiveChild}>
                {item.icon}
                {item.label}
              </summary>
              <ul>{renderMenuItems(item.children)}</ul>
            </details>
          </li>
        );
      }
      return (
        <li key={item.label} className={itemClasses}>
          <Link
            href={item.href ?? '#'}
            className={linkClasses}
            aria-disabled={item.status === 'disabled'}
            onClick={item.onClick ? () => item.onClick?.() : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <ul className={menuClasses} {...rest}>
      {items && renderMenuItems(items)}
    </ul>
  );
}
