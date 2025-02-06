import { Card } from '@/components/organism';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  argTypes: {
    title: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'The card title',
    },
    children: {
      control: { type: 'text' },
      table: { type: { summary: 'ReactNode' } },
      description: 'The card content',
    },
  },
};

export default meta;

const CardDefault: StoryObj<typeof Card> = {
  args: {
    title: 'Example Card',
    children: 'This is a sample card content.',
  },
};

export const Default = CardDefault;
