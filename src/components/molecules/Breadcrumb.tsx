import Link from 'next/link';
import { classNames } from '@/utilities/formats/string';
import { BreadcrumbProps } from '@/types/components/molecules';

export default function Breadcrumb({ items, className, ...rest }: BreadcrumbProps) {
  const breadCrumbClasses = classNames('breadcrumbs overflow-hidden text-sm', className);
  return (
    <div className={breadCrumbClasses} {...rest}>
      <ul role="menu">
        {items.map((value) =>
          value.href ? (
            <li key={value.label} role="menuitem">
              <Link href={value.href}>{value.label}</Link>
            </li>
          ) : (
            <li key={value.label} role="menuitem">
              {value.label}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
