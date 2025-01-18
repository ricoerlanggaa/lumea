import { ReactElement } from 'react';
import {
  Alert01Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from 'hugeicons-react';
import { classNames } from '@/utilities/formats/string';
import type { ToastPlacement, ToastProps, ToastVariant } from './Toast.d';

const variantClasses: Record<ToastVariant, string> = {
  success: 'alert-success',
  warning: 'alert-warning',
  info: 'alert-info',
  error: 'alert-error',
};
const variantIcons: Record<ToastVariant, ReactElement> = {
  success: <CheckmarkCircle02Icon />,
  warning: <Alert01Icon />,
  info: <InformationCircleIcon />,
  error: <CancelCircleIcon />,
};
const placementClasses: Record<ToastPlacement, string> = {
  'top-start': 'toast-top toast-start',
  'top-center': 'toast-top toast-center',
  'top-end': 'toast-top toast-end',
  'middle-start': 'toast-middle toast-start',
  'middle-center': 'toast-middle toast-center',
  'middle-end': 'toast-middle toast-end',
  'bottom-start': 'toast-bottom toast-start',
  'bottom-center': 'toast-bottom toast-center',
  'bottom-end': 'toast-bottom toast-end',
};
export default function Toast({
  message,
  variant = 'success',
  placement = 'bottom-center',
  onClose,
  className,
  ...rest
}: ToastProps) {
  const toastClasses = classNames('toast', placementClasses[placement], className);
  const alertClasses = classNames('alert shadow-lg min-w-80 gap-2', variantClasses[variant]);
  return (
    <div className={toastClasses} role="alert" {...rest}>
      <div className={alertClasses}>
        {variantIcons[variant]}
        <span>{message}</span>
        {onClose && <Cancel01Icon size={16} role="button" onClick={() => onClose()} />}
      </div>
    </div>
  );
}
