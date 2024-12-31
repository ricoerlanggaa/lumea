import { ElementType } from 'react';

export type GridItems = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export interface BaseGrid {
  cols?: GridItems | 'none' | 'subgrid';
  rows?: GridItems | 'none' | 'subgrid';
  gap?: number;
}
export interface GridProps<T extends ElementType = 'div'> extends BaseGrid {
  as?: T;
  sm?: BaseGrid;
  md?: BaseGrid;
  lg?: BaseGrid;
  xl?: BaseGrid;
}
export interface BaseGridItems {
  colSpan?: GridItems;
  rowSpan?: GridItems;
  order?: GridItems;
}
export interface GridItemProps<T extends ElementType = 'div'> extends BaseGridItems {
  as?: T;
  sm?: BaseGridItems;
  md?: BaseGridItems;
  lg?: BaseGridItems;
  xl?: BaseGridItems;
}
