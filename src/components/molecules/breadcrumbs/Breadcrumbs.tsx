import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import type { BreadcrumbsProps } from './Breadcrumbs.d';

export default function Breadcrumbs({ items, className, ...rest }: BreadcrumbsProps) {
  const classes = classNames('breadcrumbs overflow-hidden text-sm', className);
  return (
    <div className={classes} {...rest}>
      <ul role="menu">
        {items.map((value) =>
          value.href ? (
            <li key={value.key} role="menuitem">
              <Link href={value.href}>{value.label}</Link>
            </li>
          ) : (
            <li key={value.key} role="menuitem">
              {value.label}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
