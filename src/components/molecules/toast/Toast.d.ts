import { HTMLAttributes } from 'react';

type ToastVariant = 'success' | 'warning' | 'info' | 'error';
type ToastPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

interface ToastProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  variant?: ToastVariant;
  placement?: ToastPlacement;
  message: string;
  onClose?: () => void;
}
