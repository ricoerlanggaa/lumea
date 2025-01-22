'use client';

import Link from 'next/link';
import { cloneElement, HTMLAttributes, isValidElement, useId } from 'react';
import { classNames } from '@/utilities/formats/string';
import type {
  DropdownMenuBackgroundColor,
  DropdownMenuItem,
  DropdownMenuPlacement,
  DropdownMenuProps,
  DropdownMenuSize,
} from '@/types/components/molecules';

const placementClasses: Record<DropdownMenuPlacement, string> = {
  top: 'dropdown-top',
  'top-end': 'dropdown-top dropdown-end',
  bottom: 'dropdown-bottom',
  'bottom-end': 'dropdown-bottom dropdown-end',
  left: 'dropdown-left',
  'left-end': 'dropdown-left dropdown-end',
  right: 'dropdown-right',
  'right-end': 'dropdown-right dropdown-end',
};
const sizeClasses: Record<DropdownMenuSize, string> = {
  sm: 'menu-sm min-w-36',
  md: 'menu-md min-w-40',
  lg: 'menu-lg min-w-44',
};
const bgColorClasses: Record<DropdownMenuBackgroundColor, string> = {
  base: 'bg-base-200 text-base-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
};

export default function DropdownMenu({
  placement = 'bottom',
  trigger = 'click',
  bgColor = 'base',
  size = 'md',
  items,
  className,
  children,
  ...rest
}: DropdownMenuProps) {
  const dropdownMenuId = useId();
  const dropdownClasses = classNames(
    'dropdown shadow-xl',
    trigger === 'hover' && 'dropdown-hover',
    placementClasses[placement],
    className,
  );
  const contentClasses = classNames(
    'dropdown-content menu z-[1] rounded-box shadow',
    sizeClasses[size],
    bgColorClasses[bgColor],
  );
  const validChildren = isValidElement<HTMLAttributes<HTMLElement>>(children);
  const clonedChildren =
    validChildren &&
    cloneElement(children, {
      'aria-controls': dropdownMenuId,
      'aria-haspopup': true,
      tabIndex: 0,
      role: 'button',
    });
  const checkActiveChild = (item: DropdownMenuItem[][number]): boolean => {
    if (item.status === 'active') return true;
    if (item.children) {
      return item.children.some(checkActiveChild);
    }
    return false;
  };
  const renderMenuItems = (menuItems: DropdownMenuItem[]) => {
    return menuItems.map((item) => {
      const itemClasses = classNames(item.status === 'disabled' && 'disabled');
      const linkClasses = classNames(item.status === 'active' && 'focus');
      const hasActiveChild = item.children?.some((child) => checkActiveChild(child));
      if (item.children) {
        return (
          <li key={item.label} role="menuitem">
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
        <li key={item.label} role="menuitem" className={itemClasses}>
          <Link
            href={item.href ?? '#'}
            className={linkClasses}
            aria-disabled={item.status === 'disabled'}
            tabIndex={item.status === 'disabled' ? -1 : undefined}
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
    <div className={dropdownClasses} {...rest}>
      {clonedChildren}
      <ul id={dropdownMenuId} className={contentClasses} tabIndex={0} role="menu">
        {items && renderMenuItems(items)}
      </ul>
    </div>
  );
}
