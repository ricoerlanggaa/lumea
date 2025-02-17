import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit'],
      description: 'Defines the button type.',
      table: { type: { summary: 'button | submit' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outlined', 'ghost'],
      description: 'Set button variant',
      table: { type: { summary: 'solid | outlined | ghost' } },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'error', 'black', 'white'],
      table: {
        type: { summary: 'primary | secondary | success | warning | info | error | black | white' },
      },
      description: 'Set button color',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'sm | md | lg' } },
      description: 'Set the size of button',
    },
    shape: {
      control: { type: 'select' },
      options: ['none', 'circle', 'square', 'wide', 'block'],
      table: { type: { summary: 'none | circle | square | wide | block' } },
      description: 'Can be used to set button shape',
    },
    disabled: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
      description: 'Disabled state of button',
    },
    href: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'Redirect url of link button',
    },
    children: {
      control: { type: 'text' },
      table: { type: { summary: 'ReactNode' } },
      description: 'The content of the button',
    },
  },
};

export default meta;

const ButtonDefault: StoryObj<typeof Button> = {
  args: {
    type: 'button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    shape: 'none',
    disabled: false,
    children: 'Button',
  },
};

export const Default = ButtonDefault;
