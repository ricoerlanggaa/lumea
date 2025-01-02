import type { HTMLAttributes } from 'react';

type MenuItems = {
  key: number | string;
  label: string;
  href?: string;
  children?: MenuItems;
}[];

type MenuBackgrounColor = 'base' | 'primary' | 'secondary';

interface MenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItems;
  orientation?: 'vertical' | 'horizontal';
  bgColor?: MenuBackgrounColor;
}
