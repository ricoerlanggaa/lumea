import type { ReactNode, TableHTMLAttributes } from 'react';

export type TableColumnAlign = 'left' | 'center' | 'right';
export type TableColumn<K extends string> = {
  key: K;
  label: string;
  align?: TableColumnAlign;
};
export type TableColumns<K extends string> = TableColumn<K>[];
export type TableItems<K extends string> = Array<
  Record<K, ReactNode | string | number | null> & { key: string | number }
>;

export interface TableProps<K extends string>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumns<K>;
  items?: TableItems<K>;
}
