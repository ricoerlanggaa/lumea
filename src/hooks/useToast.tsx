import { Alert } from '@/components/atoms';
import { AlertVariant } from '@/types/components/atoms';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useCallback } from 'react';

interface ToastConfig {
  variant: AlertVariant;
  message: string;
  duration?: number;
}

export default function useToast() {
  const toastContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast toast-bottom toast-center';
    document.body.appendChild(toastContainer);
    toastContainerRef.current = toastContainer;

    return () => {
      toastContainerRef.current?.remove();
      toastContainerRef.current = null;
    };
  }, []);

  const showToast = useCallback(({ variant, message, duration }: ToastConfig) => {
    if (!toastContainerRef.current) return;

    const toastElement = document.createElement('div');
    const root = createRoot(toastElement);

    const handleClose = () => {
      root.unmount();
      toastElement.remove();
    };

    root.render(<Alert variant={variant} message={message} onClose={handleClose} />);
    toastContainerRef.current.appendChild(toastElement);

    if (duration) {
      setTimeout(() => {
        handleClose();
      }, duration);
    }
  }, []);

  return { showToast };
}
