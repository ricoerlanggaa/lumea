import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Toast } from '@/components/molecules';
import type { ToastVariant, ToastPlacement } from '@/components/molecules/toast/Toast.d';

interface ToastConfig {
  message: string;
  variant?: ToastVariant;
  placement?: ToastPlacement;
  duration?: number;
}

export default function useToast() {
  const showToast = useCallback((config: ToastConfig) => {
    const { message, variant = 'success', placement = 'bottom-center', duration = 3000 } = config;
    const toastContainer = document.createElement('div');
    document.body.appendChild(toastContainer);

    const root = createRoot(toastContainer);
    root.render(
      <Toast
        message={message}
        variant={variant}
        placement={placement}
        onClose={() => {
          if (toastContainer.parentNode) {
            root.unmount();
            document.body.removeChild(toastContainer);
          }
        }}
      />,
    );

    setTimeout(() => {
      if (toastContainer.parentNode) {
        root.unmount();
        document.body.removeChild(toastContainer);
      }
    }, duration);
  }, []);

  return { showToast };
}
