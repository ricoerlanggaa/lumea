'use client';

import { useState, type ReactElement } from 'react';
import {
  Alert01Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from 'hugeicons-react';
import type { AlertProps, AlertVariant } from '@/types/components/atoms';
import { classNames } from '@/utilities/formats/string';

const alertIcons: Record<AlertVariant, ReactElement> = {
  success: <CheckmarkCircle02Icon />,
  warning: <Alert01Icon />,
  info: <InformationCircleIcon />,
  error: <CancelCircleIcon />,
};
const variantClasses: Record<AlertVariant, string> = {
  success: 'alert-success',
  warning: 'alert-warning',
  info: 'alert-info',
  error: 'alert-error',
};

export default function Alert({ variant = 'success', message, onClose }: AlertProps) {
  const alertClasses = classNames(
    'alert grid-flow-col justify-items-start text-start',
    variantClasses[variant],
  );
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  if (!isVisible) return null;
  return (
    <div role="alert" className={alertClasses}>
      {alertIcons[variant]}
      <span>{message}</span>
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        aria-label="close"
        onClick={handleClose}
      >
        <Cancel01Icon size={16} />
      </button>
    </div>
  );
}
