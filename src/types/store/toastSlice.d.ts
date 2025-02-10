import { AlertVariant } from '../components/atoms';

export interface ToastStateItem {
  id: string;
  variant: AlertVariant;
  message: string;
}
export interface ToastShowAction extends Omit<ToastStateItem, 'id'> {
  duration?: number;
}
export interface ToastState {
  toasts: ToastStateItem[];
}
