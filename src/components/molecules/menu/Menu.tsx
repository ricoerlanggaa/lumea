import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import type { MenuBackgrounColor, MenuItems, MenuProps } from './Menu.d';

const bgColorClasses: Record<MenuBackgrounColor, string> = {
  base: 'bg-base-200',
  primary: 'bg-primary text-base-100',
  secondary: 'bg-secondary',
};

export default function Menu({ orientation, items, bgColor, className, ...rest }: MenuProps) {
  const classes = classNames(
    'menu',
    bgColor && bgColorClasses[bgColor],
    orientation === 'horizontal' ? 'menu-horizontal' : 'menu-vertical',
    className,
  );
  const renderMenuItems = (menuItems: MenuItems) => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <li key={item.key}>
            <details>
              <summary>{item.label}</summary>
              <ul>{renderMenuItems(item.children)}</ul>
            </details>
          </li>
        );
      }
      return (
        <li key={item.key}>
          <Link href={item.href ?? '#'}>{item.label}</Link>
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
