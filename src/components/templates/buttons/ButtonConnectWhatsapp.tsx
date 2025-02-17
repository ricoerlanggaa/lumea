'use client';

import { useEffect } from 'react';
import { MetaIcon, MoreVerticalCircle01Icon, Settings02Icon } from 'hugeicons-react';
import { Button } from '@/components/atoms';
import { QRCode } from '@/components/molecules';
import { Modal } from '@/components/organism';
import useModal from '@/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { codeState, codeStatusState, generateCode } from '@/store/whatsappSlice';

export default function ButtonConnectWhatsapp() {
  const dispatch = useAppDispatch();
  const code = useAppSelector(codeState);
  const codeStatus = useAppSelector(codeStatusState);

  const { isOpen, openModal, closeModal } = useModal('modal-connect-whatsapp');

  const handleConnect = () => {
    openModal();
    dispatch(generateCode());
  };

  useEffect(() => {
    if (codeStatus === 'connected') closeModal();
  }, [closeModal, codeStatus]);

  return (
    <>
      <Button color="black" className="mr-auto mb-4" onClick={() => handleConnect()}>
        <MetaIcon className="mr-1" />
        Hubungkan Nomor
      </Button>
      <Modal id="modal-connect-whatsapp" title="Integrasi Nomor Whatsapp" open={isOpen}>
        <ol className="list-decimal leading-loose list-inside mb-4">
          <li>Buka WhatsApp di telepon Anda</li>
          <li>
            Ketuk{' '}
            <strong className="inline-flex items-baseline ">
              Menu&nbsp;
              <span className="bg-base-200 my-auto border rounded p-[1px]">
                <MoreVerticalCircle01Icon size={18} />
              </span>
            </strong>{' '}
            di Android, atau{' '}
            <strong className="inline-flex items-baseline ">
              Pengaturan&nbsp;
              <span className="bg-base-200 my-auto border rounded p-[1px]">
                <Settings02Icon size={20} />
              </span>
            </strong>{' '}
            di iPhone
          </li>
          <li>
            Ketuk <strong>Perangkat tertaut</strong> lalu <strong>Tautkan perangkat</strong>
          </li>
          <li>Arahkan telepon Anda di layar ini untuk memindai kode QR</li>
        </ol>
        <QRCode
          value={code}
          size={264}
          status={codeStatus}
          icon="/images/logo/whatsapp.svg"
          iconSize={64}
          className="mx-auto"
          onRefresh={() => dispatch(generateCode())}
        />
      </Modal>
    </>
  );
}
