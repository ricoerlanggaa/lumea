'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from '@/components/atoms';
import ToastContext from '@/contexts/ToastContext';
import type { ToastProps, ToastShowProps, ToastState } from '@/types/providers/ToastProvider';

export default function ToastProvider({ children }: ToastProps) {
  const [toasts, setToasts] = useState<ToastState>([]);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const showToast = useCallback(({ variant, message, duration }: ToastShowProps) => {
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
      {portalRoot &&
        createPortal(
          <div className="toast toast-bottom toast-center">
            {toasts.map(({ id, variant, message }) => (
              <Alert key={id} variant={variant} message={message} />
            ))}
          </div>,
          portalRoot,
        )}
    </ToastContext.Provider>
  );
}
