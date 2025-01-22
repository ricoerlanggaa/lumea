import { HTMLAttributes } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: BreadcrumbItem[];
}
