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
    helperText: {
      control: { type: 'text' },
      description: 'Used to provide context about input field',
      table: { type: { summary: 'string' } },
    },
    hasError: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
      description: 'Set validation error',
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
    helperText: 'Some important helper text',
    hasError: true,
    disabled: false,
    rows: 5,
  },
};

export const Default = TextAreaDefault;
