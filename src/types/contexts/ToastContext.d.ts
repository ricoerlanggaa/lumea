import { AlertVariant } from '../components/atoms';

export interface ToastConfig {
  variant: AlertVariant;
  message: string;
  duration?: number;
}

export interface ToastContextProps {
  // eslint-disable-next-line no-unused-vars
  showToast: (config: ToastConfig) => void;
}
