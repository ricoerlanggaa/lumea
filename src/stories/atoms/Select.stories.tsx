import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/atoms';
import { SelectOption } from '@/types/components/atoms';

const selectOptions: SelectOption[] = [
  { label: 'Babi', value: 'Babi' },
  { label: 'Kudanil', value: 'Kudanil' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    options: {
      control: { type: 'select' },
      description: 'Select options.',
      options: selectOptions.map((value) => value.label),
      table: { type: { summary: '{ label, value }[]' } },
    },
    label: {
      control: { type: 'text' },
      description: 'Label select',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder of select',
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
      description: 'Whether the select is disabled',
    },
  },
};

export default meta;

const SelectDefault: StoryObj<typeof Select> = {
  args: {
    options: selectOptions,
    placeholder: 'Select option',
    helperText: 'Some important helper text',
    hasError: true,
    disabled: false,
  },
};

export const Default = SelectDefault;
