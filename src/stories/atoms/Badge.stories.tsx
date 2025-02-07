import { Badge } from '@/components/atoms';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['success', 'warning', 'info', 'error'],
      table: {
        type: { summary: 'success | warning | info | error' },
      },
      description: 'Set badge color',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'sm | md | lg' } },
      description: 'Set the size of badge',
    },
    outline: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
      description: 'Transparent badge with color border',
    },
    children: {
      control: { type: 'text' },
      table: { type: { summary: 'ReactNode' } },
      description: 'The content of the badge',
    },
  },
};

export default meta;

const BadgeDefault: StoryObj<typeof Badge> = {
  args: {
    color: 'success',
    size: 'md',
    outline: true,
    children: 'success',
  },
};

export const Default = BadgeDefault;
