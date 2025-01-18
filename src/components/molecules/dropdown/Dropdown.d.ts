import type { HTMLAttributes, ReactElement } from 'react';

type DropdownPlacement =
  | 'top'
  | 'top-end'
  | 'bottom'
  | 'bottom-end'
  | 'left'
  | 'left-end'
  | 'right'
  | 'right-end';
type DropdownTrigger = 'click' | 'hover';
type DropdownBackgroundColor = 'base' | 'primary' | 'secondary';
type DropdownMenuSize = 'sm' | 'md' | 'lg';
type DropdownMenuItems = {
  key: number | string;
  label: string;
  icon?: ReactElement;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: DropdownMenuItems;
}[];

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  placement?: DropdownPlacement;
  bgColor?: DropdownBackgroundColor;
  trigger?: DropdownTrigger;
  menuItems?: DropdownMenuItems;
  menuSize?: DropdownMenuSize;
  children?: ReactElement;
}
