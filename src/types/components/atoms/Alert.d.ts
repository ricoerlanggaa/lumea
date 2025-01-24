import type { HTMLAttributes } from 'react';

export type AlertVariant = 'success' | 'warning' | 'info' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  variant?: AlertVariant;
  message?: string;
  onClose?: () => void;
}
