import type { HTMLAttributes, ReactElement } from 'react';

type MenuItems = {
  key: number | string;
  label: string;
  icon?: ReactElement;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children?: MenuItems;
}[];
type MenuSize = 'sm' | 'md' | 'lg';
type MenuBackgrounColor = 'base' | 'primary' | 'secondary';

interface MenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItems;
  orientation?: 'vertical' | 'horizontal';
  bgColor?: MenuBackgrounColor;
  size?: MenuSize;
}
