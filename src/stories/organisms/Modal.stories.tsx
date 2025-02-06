import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/components/organism';
import useModal from '@/hooks/useModal';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  argTypes: {
    id: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'The modal dialog id',
    },
    title: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      description: 'The modal dialog title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    id: 'storybook-modal',
    title: 'Example Modal',
  },
  render: (args) => {
    const { isOpen, openModal } = useModal(args.id);
    return (
      <>
        <button type="button" onClick={openModal} className="btn btn-primary">
          Open Modal
        </button>
        <Modal open={isOpen} {...args}>
          <p>This is a sample modal content.</p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Modal } from '@/components/organism';
import useModal from '@/hooks/useModal';

export default function Example() {
  const { isOpen, openModal } = useModal('storybook-modal');
  return (
    <>
      <button type="button" onClick={openModal} className="btn btn-primary">Open Modal</button>
      <Modal id="storybook-modal" title="Example Modal" open={isOpen}>
        <p>This is a sample modal content.</p>
      </Modal>
    </>
  );
}`,
      },
    },
  },
};
