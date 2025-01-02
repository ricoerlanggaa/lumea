import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { classNames } from '@/utilities/formats/string';
import type { GridItemProps, GridProps } from './Grid.d';

function Grid<T extends ElementType = 'div'>({
  as,
  cols,
  rows,
  sm,
  md,
  lg,
  xl,
  children,
  ...rest
}: GridProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as ?? 'div';
  const classes = classNames(
    'grid',
    cols && `grid-cols-${cols}`,
    rows && `grid-rows-${rows}`,
    sm?.cols && `sm:grid-cols-${sm.cols}`,
    md?.cols && `md:grid-cols-${md.cols}`,
    lg?.cols && `lg:grid-cols-${lg.cols}`,
    xl?.cols && `xl:grid-cols-${xl.cols}`,
    sm?.rows && `sm:grid-rows-${sm.rows}`,
    md?.rows && `md:grid-rows-${md.rows}`,
    lg?.rows && `lg:grid-rows-${lg.rows}`,
    xl?.rows && `xl:grid-rows-${xl.rows}`,
  );
  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
}

function GridItem<T extends ElementType = 'div'>({
  as,
  colSpan,
  rowSpan,
  order,
  sm,
  md,
  lg,
  xl,
  children,
  ...rest
}: GridItemProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as ?? 'div';
  const classes = classNames(
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    order && `order-${order}`,
    sm?.colSpan && `col-span-${sm.colSpan}`,
    sm?.rowSpan && `row-span-${sm.rowSpan}`,
    sm?.order && `order-${sm.order}`,
    md?.colSpan && `col-span-${md.colSpan}`,
    md?.rowSpan && `row-span-${md.rowSpan}`,
    md?.order && `order-${md.order}`,
    lg?.colSpan && `col-span-${lg.colSpan}`,
    lg?.rowSpan && `row-span-${lg.rowSpan}`,
    lg?.order && `order-${lg.order}`,
    xl?.colSpan && `col-span-${xl.colSpan}`,
    xl?.rowSpan && `row-span-${xl.rowSpan}`,
    xl?.order && `order-${xl.order}`,
  );
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

Grid.Item = GridItem;

export default Grid;
