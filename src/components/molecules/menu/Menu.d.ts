import type { HTMLAttributes } from 'react';

type MenuItems = {
  href?: string;
  label: string;
  children?: MenuItems;
}[];

type MenuBackgrounColor = 'base' | 'primary' | 'secondary';

interface MenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItems;
  orientation?: 'vertical' | 'horizontal';
  bgColor?: MenuBackgrounColor;
}
