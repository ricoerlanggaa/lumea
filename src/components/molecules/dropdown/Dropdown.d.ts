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
type DropdownMenuItems = {
  key: number | string;
  label: string;
  icon?: ReactElement;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children?: DropdownMenuItems;
}[];

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  placement?: DropdownPlacement;
  bgColor?: DropdownBackgroundColor;
  trigger?: DropdownTrigger;
  menuItems?: DropdownMenuItems;
  children?: ReactElement;
}
