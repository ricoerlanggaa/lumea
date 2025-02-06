'use client';

import { useCallback, useEffect, useState } from 'react';

export default function useModal(modalId: string) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      setIsOpen(true);
    }
  }, [modalId]);

  const closeModal = useCallback(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
      setIsOpen(false);
    }
  }, [modalId]);

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      const handleCancel = (event: Event) => {
        event.preventDefault();
      };
      modal.addEventListener('cancel', handleCancel);
      return () => modal.removeEventListener('cancel', handleCancel);
    }
    return undefined;
  }, [modalId]);

  return { isOpen, openModal, closeModal };
}
