'use client';

import Link from 'next/link';
import { cloneElement, HTMLAttributes, isValidElement, useId } from 'react';
import { classNames } from '@/utilities/formats/string';
import type {
  DropdownBackgroundColor,
  DropdownMenuItems,
  DropdownMenuSize,
  DropdownPlacement,
  DropdownProps,
} from './Dropdown.d';

const placementClasses: Record<DropdownPlacement, string> = {
  top: 'dropdown-top',
  'top-end': 'dropdown-top dropdown-end',
  bottom: 'dropdown-bottom',
  'bottom-end': 'dropdown-bottom dropdown-end',
  left: 'dropdown-left',
  'left-end': 'dropdown-left dropdown-end',
  right: 'dropdown-right',
  'right-end': 'dropdown-right dropdown-end',
};
const menuSizeClasses: Record<DropdownMenuSize, string> = {
  sm: 'menu-sm min-w-36',
  md: 'menu-md min-w-40',
  lg: 'menu-lg min-w-44',
};
const bgColorClasses: Record<DropdownBackgroundColor, string> = {
  base: 'bg-base-200 text-base-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
};

export default function Dropdown({
  placement = 'bottom',
  trigger = 'click',
  bgColor = 'base',
  menuSize = 'md',
  menuItems,
  className,
  children,
  ...rest
}: DropdownProps) {
  const dropdownId = useId();
  const classes = classNames(
    'dropdown shadow-xl',
    trigger === 'hover' && 'dropdown-hover',
    placementClasses[placement],
    className,
  );
  const contentClasses = classNames(
    'dropdown-content menu z-[1] rounded-box shadow',
    menuSizeClasses[menuSize],
    bgColorClasses[bgColor],
  );
  const validChildren = isValidElement<HTMLAttributes<HTMLElement>>(children);
  const clonedChildren =
    validChildren &&
    cloneElement(children, {
      'aria-controls': dropdownId,
      'aria-haspopup': true,
      tabIndex: 0,
      role: 'button',
    });
  const checkActiveChild = (item: DropdownMenuItems[number]): boolean => {
    if (item.active) return true;
    if (item.children) {
      return item.children.some(checkActiveChild);
    }
    return false;
  };
  const renderMenuItems = (items: DropdownMenuItems) => {
    return items.map((item) => {
      const hasActiveChild = item.children?.some((child) => checkActiveChild(child));
      if (item.children) {
        return (
          <li key={item.key} role="menuitem">
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
        <li key={item.key} role="menuitem" className={classNames(item.disabled && 'disabled')}>
          <Link
            href={item.href ?? '#'}
            className={classNames(item.active && 'focus', item.disabled && 'pointer-events-none')}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : undefined}
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
    <div className={classes} {...rest}>
      {clonedChildren}
      <ul id={dropdownId} className={contentClasses} tabIndex={0} role="menu">
        {menuItems && renderMenuItems(menuItems)}
      </ul>
    </div>
  );
}
