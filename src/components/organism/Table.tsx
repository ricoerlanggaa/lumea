import type { ReactNode } from 'react';
import type { TableColumnAlign, TableProps } from '@/types/components/organisms';
import { classNames } from '@/utilities/formats/string';

const alignClasses: Record<TableColumnAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};
export default function Table<T extends string>({
  columns,
  items,
  className,
  ...rest
}: TableProps<T>) {
  const tableClasses = classNames(
    'table rounded-lg border border-separate w-full bg-base-100',
    className,
  );
  return (
    <table className={tableClasses} {...rest}>
      <thead>
        <tr className="bg-base-200">
          {columns.map(({ key, label, align }, index) => (
            <th
              key={key}
              className={classNames(
                'border p-4',
                align && alignClasses[align],
                index === 0 && 'rounded-tl-lg',
                index === columns.length - 1 && 'rounded-tr-lg',
              )}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item, indexItem) => (
            <tr key={item.key}>
              {columns.map(({ key, align }, index) => (
                <td
                  key={key}
                  className={classNames(
                    'border p-4',
                    align && alignClasses[align],
                    indexItem === 0 && index === 0 && 'rounded-bl-lg',
                    indexItem === items.length - 1 &&
                      index === columns.length - 1 &&
                      'rounded-br-lg',
                  )}
                >
                  {item[key] as ReactNode}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center border rounded-b-lg p-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
