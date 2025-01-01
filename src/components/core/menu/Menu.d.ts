import type { HTMLAttributes } from 'react';

export type MenuItems = {
  href?: string;
  label: string;
  children?: MenuItems;
}[];

export type MenuBackgrounColor = 'base' | 'primary' | 'secondary';

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItems;
  orientation?: 'vertical' | 'horizontal';
  bgColor?: MenuBackgrounColor;
}
