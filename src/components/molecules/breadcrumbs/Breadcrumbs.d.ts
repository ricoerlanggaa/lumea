import { HTMLAttributes } from 'react';

type BreadcrumbsItems = {
  key: number | string;
  label: string;
  href?: string;
}[];

interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: BreadcrumbsItems;
}
