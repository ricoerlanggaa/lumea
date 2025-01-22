import type { HTMLAttributes, ReactElement } from 'react';

export type DropdownMenuPlacement =
  | 'top'
  | 'top-end'
  | 'bottom'
  | 'bottom-end'
  | 'left'
  | 'left-end'
  | 'right'
  | 'right-end';
export type DropdownMenuTrigger = 'click' | 'hover';
export type DropdownMenuBackgroundColor = 'base' | 'primary' | 'secondary';
export type DropdownMenuSize = 'sm' | 'md' | 'lg';

export type DropdownMenuItemStatus = 'none' | 'active' | 'disabled';
export interface DropdownMenuItem {
  key: number | string;
  label: string;
  icon?: ReactElement;
  href?: string;
  status?: DropdownMenuItemStatus;
  onClick?: () => void;
  children?: DropdownMenuItem[];
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLElement> {
  placement?: DropdownMenuPlacement;
  bgColor?: DropdownMenuBackgroundColor;
  trigger?: DropdownMenuTrigger;
  items?: DropdownMenuItem[];
  size?: DropdownMenuSize;
  children?: ReactElement;
}
