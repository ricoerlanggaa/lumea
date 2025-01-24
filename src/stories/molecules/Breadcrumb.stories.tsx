import { Breadcrumb } from '@/components/molecules';
import type { Meta, StoryObj } from '@storybook/react';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Documents', href: '/' },
  { label: 'Add Document' },
];
const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    items: {
      description: 'The routing stack information of router',
      table: { type: { summary: '{ label, href }[]' } },
    },
  },
};

export default meta;

const BreadcrumbDefault: StoryObj<typeof Breadcrumb> = {
  args: {
    items: breadcrumbItems,
  },
};

export const Default = BreadcrumbDefault;
