'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from '@/components/atoms';
import { StoreState } from '@/types/hooks/useStore';
import { useAppSelector } from '@/hooks/useStore';

export default function ToastProvider({ children }: { children: ReactNode }) {
  const toasts = useAppSelector((state: StoreState) => state.toast.toasts);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    <>
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
    </>
  );
}
