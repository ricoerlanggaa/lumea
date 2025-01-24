import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@/components/atoms';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label textarea',
      table: { type: { summary: 'string' } },
    },
    rows: {
      control: { type: 'number' },
      description: 'The number of visible text lines for the control.',
      table: { type: { summary: 'number' } },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder of textarea',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
      description: 'Whether the textarea is disabled',
    },
  },
};

export default meta;

const TextAreaDefault: StoryObj<typeof TextArea> = {
  args: {
    placeholder: 'Here is a sample placeholder',
    disabled: false,
    rows: 5,
  },
};

export const Default = TextAreaDefault;
