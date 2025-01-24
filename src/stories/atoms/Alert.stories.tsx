import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/components/atoms';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'info', 'error'],
      description: 'Variant of alert styles',
      table: { type: { summary: 'success | warning | info | error' } },
    },
    message: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'Message of alert',
    },
    onClose: {
      control: { type: 'text' },
      table: { type: { summary: '() => void' } },
      description: 'Callback when Alert is closed',
    },
  },
};

export default meta;

const AvatarDefault: StoryObj<typeof Alert> = {
  args: {
    variant: 'success',
    message: 'Something big is coming!',
  },
};

export const Default = AvatarDefault;
