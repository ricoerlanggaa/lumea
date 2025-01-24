import { QRCode } from '@/components/molecules';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof QRCode> = {
  title: 'Molecules/QRCode',
  component: QRCode,
  argTypes: {
    value: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'scanned text',
    },
    size: {
      control: { type: 'number' },
      table: { type: { summary: 'number' } },
      description: 'QRCode size',
    },
    errorLevel: {
      control: { type: 'select' },
      options: ['L', 'M', 'Q', 'H'],
      description: 'Error Code Level',
      table: { type: { summary: 'L | M | Q | H' } },
    },
    status: {
      control: { type: 'select' },
      options: ['active', 'expired', 'loading'],
      description: 'QRCode status',
      table: { type: { summary: 'active | expired | loading' } },
    },
    icon: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'include image url (only image link are supported)',
    },
    iconSize: {
      control: { type: 'number' },
      table: { type: { summary: 'number' } },
      description: 'include image size',
    },
    onRefresh: {
      control: { type: 'text' },
      table: { type: { summary: '() => void' } },
      description: 'callback',
    },
  },
};

export default meta;

const QRCodeDefault: StoryObj<typeof QRCode> = {
  args: {
    value: 'https://web.whatsapp.com/',
    size: 160,
    errorLevel: 'M',
    status: 'active',
    icon: '/images/logo/whatsapp.svg',
    iconSize: 40,
  },
};

export const Default = QRCodeDefault;
