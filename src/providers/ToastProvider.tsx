'use client';

import { useState, useCallback, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ToastContext from '@/contexts/ToastContext';
import { Alert } from '@/components/atoms';
import type { AlertVariant } from '@/types/components/atoms';

interface ToastConfig {
  id: string;
  variant: AlertVariant;
  message: string;
  duration?: number;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const showToast = useCallback(({ variant, message, duration }: Omit<ToastConfig, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prevToasts) => [...prevToasts, { id, variant, message, duration }]);

    if (duration) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, duration);
    }
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="toast toast-bottom toast-center">
          {toasts.map(({ id, variant, message }) => (
            <Alert key={id} variant={variant} message={message} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
