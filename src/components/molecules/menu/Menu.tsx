import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import type { MenuBackgrounColor, MenuItems, MenuProps, MenuSize } from './Menu.d';

const bgColorClasses: Record<MenuBackgrounColor, string> = {
  base: 'bg-base-200 text-base-content',
  primary: 'bg-primary text-base-100',
  secondary: 'bg-secondary',
};
const sizeClasses: Record<MenuSize, string> = {
  sm: 'menu-sm',
  md: 'menu-md',
  lg: 'menu-lg',
};

export default function Menu({ orientation, items, bgColor, size, className, ...rest }: MenuProps) {
  const classes = classNames(
    'menu',
    size && sizeClasses[size],
    bgColor && bgColorClasses[bgColor],
    orientation === 'horizontal' ? 'menu-horizontal' : 'menu-vertical',
    className,
  );
  const checkActiveChild = (item: MenuItems[number]): boolean => {
    if (item.active) return true;
    if (item.children) {
      return item.children.some(checkActiveChild);
    }
    return false;
  };
  const renderMenuItems = (menuItems: MenuItems) => {
    return menuItems.map((item) => {
      const hasActiveChild = item.children?.some((child) => checkActiveChild(child));
      if (item.children) {
        return (
          <li key={item.key}>
            <details open={hasActiveChild}>
              <summary>
                {item.icon}
                {item.label}
              </summary>
              <ul>{renderMenuItems(item.children)}</ul>
            </details>
          </li>
        );
      }
      return (
        <li key={item.key} className={classNames(item.disabled && 'disabled')}>
          <Link
            href={item.href ?? '#'}
            className={classNames(item.active && 'focus', item.disabled && 'pointer-events-none')}
            aria-disabled={item.disabled}
          >
            {item.icon}
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <ul className={classes} {...rest}>
      {items && renderMenuItems(items)}
    </ul>
  );
}
