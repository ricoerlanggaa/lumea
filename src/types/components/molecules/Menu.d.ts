import type { HTMLAttributes, ReactElement } from 'react';

export type MenuOrientation = 'vertical' | 'horizontal';
export type MenuSize = 'sm' | 'md' | 'lg';
export type MenuBackgrounColor = 'base' | 'primary' | 'secondary';

export type MenuItemStatus = 'none' | 'active' | 'disabled';
export interface MenuItem {
  key: number | string;
  label: string;
  icon?: ReactElement;
  href?: string;
  status?: MenuItemStatus;
  onClick?: () => void;
  children?: MenuItem[];
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items?: MenuItem[];
  orientation?: 'vertical' | 'horizontal';
  bgColor?: MenuBackgrounColor;
  size?: MenuSize;
}
