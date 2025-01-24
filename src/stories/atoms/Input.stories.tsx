import type { FC, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/atoms';
import {
  Mail01Icon,
  SquareLock02Icon,
  UserIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from 'hugeicons-react';

const transformIcons = (obj: Record<string, FC>): Record<string, ReactElement> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const Icon = obj[key];
      acc[key] = <Icon />;
      return acc;
    },
    {} as Record<string, ReactElement>,
  );
};

const icons: Record<string, FC> = {
  Mail01Icon,
  SquareLock02Icon,
  ViewIcon,
  ViewOffSlashIcon,
  UserIcon,
};

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password', 'tel', 'url', 'search'],
      description: 'The type of input',
      table: { type: { summary: 'text | number | email | password | tel | url | search' } },
    },
    label: {
      control: { type: 'text' },
      description: 'Label input',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder of input',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
      description: 'Whether the input is disabled',
    },
    prefix: {
      control: { type: 'select' },
      options: Object.keys(icons),
      description: 'The prefix icon for the Input',
      table: { type: { summary: 'ReactNode' } },
      mapping: transformIcons(icons),
    },
    suffix: {
      control: { type: 'select' },
      options: Object.keys(icons),
      description: 'The suffix icon for the Input',
      table: { type: { summary: 'ReactNode' } },
      mapping: transformIcons(icons),
    },
  },
};

export default meta;

const InputDefault: StoryObj<typeof Input> = {
  args: {
    type: 'text',
    placeholder: 'Here is a sample placeholder',
    disabled: false,
  },
};

export const Default = InputDefault;
