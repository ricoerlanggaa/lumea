import { Button } from '@/components/atoms';
import { ButtonProps } from '@/types/components/atoms';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  const setup = (props?: Partial<ButtonProps>) => {
    render(<Button {...props}>Click me</Button>);
  };

  it('renders correctly with default props', () => {
    setup();
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('applies the correct variant classes', () => {
    setup({ variant: 'outlined' });
    expect(screen.getByRole('button')).toHaveClass('btn-outline');
  });

  it('applies the correct color classes', () => {
    setup({ color: 'success' });
    expect(screen.getByRole('button')).toHaveClass('btn-success');
  });

  it('applies the correct size classes', () => {
    setup({ size: 'lg' });
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('applies the correct shape classes', () => {
    setup({ shape: 'circle' });
    expect(screen.getByRole('button')).toHaveClass('btn-circle');
  });

  it('disables the button when disabled prop is true', () => {
    setup({ disabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  it('renders as a link when href is provided', () => {
    setup({ href: '/test' });
    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = jest.fn();
    setup({ onClick });
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = jest.fn();
    setup({ onClick, disabled: true });
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
