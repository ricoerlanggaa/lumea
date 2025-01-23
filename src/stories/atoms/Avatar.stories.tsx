import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/atoms';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'The address of the image for an image avatar',
      table: { type: { summary: 'string' } },
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'squircle', 'hexagon', 'triangle'],
      description: 'The shape of avatar',
      table: { type: { summary: 'circle | square | squircle | hexagon | triangle' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the avatar',
      table: { type: { summary: 'sm | md | lg' } },
    },
    alt: {
      control: { type: 'text' },
      description: 'This attribute defines the alternative text describing the image',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

const AvatarDefault: StoryObj<typeof Avatar> = {
  args: {
    shape: 'circle',
    size: 'md',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPraWRu4CL39icY3zmprlq9em7l9xahIRIA&s',
  },
};

export const Default = AvatarDefault;
