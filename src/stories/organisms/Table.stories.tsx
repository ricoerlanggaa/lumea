import { Table } from '@/components/organism';
import { TableColumns } from '@/types/components/organisms';
import type { Meta, StoryObj } from '@storybook/react';

const columns: TableColumns<string> = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'address', label: 'Address' },
];
const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  parameters: {
    backgrounds: {
      default: '#ffffff',
    },
  },
  argTypes: {
    columns: {
      table: { type: { summary: '{ key, label, align }[]' } },
      description: 'Columns of table',
    },
    items: {
      table: {
        type: {
          summary: 'array',
        },
      },
      description: 'Data record array to be displayed',
    },
  },
};

export default meta;

const TableDefault: StoryObj<typeof Table> = {
  args: {
    columns,
    items: [],
  },
};

export const Default = TableDefault;
