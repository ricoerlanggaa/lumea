import { createContext } from 'react';
import { AlertVariant } from '@/types/components/atoms';

interface ToastConfig {
  variant: AlertVariant;
  message: string;
  duration?: number;
}

interface ToastContextProps {
  // eslint-disable-next-line no-unused-vars
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export default ToastContext;
