'use client';

import { useEffect, useId } from 'react';
import { Cancel01Icon, MetaIcon, MoreVerticalCircle01Icon, Settings02Icon } from 'hugeicons-react';
import { Button, Typography } from '@/components/atoms';
import { QRCode } from '@/components/molecules';
import useToast from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { codeState, codeStatusState, fetchList, generateCode } from '@/store/whatsappSlice';

export default function ButtonConnectWhatsapp() {
  const dispatch = useAppDispatch();
  const code = useAppSelector(codeState);
  const codeStatus = useAppSelector(codeStatusState);

  const modalId = useId();
  const { showToast } = useToast();

  const handleGenerateCode = async () => {
    try {
      await dispatch(generateCode()).unwrap();
    } catch (error) {
      showToast({
        variant: 'error',
        message: String(error),
        duration: 3000,
      });
    }
  };
  const handleConnectWhatsapp = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
    handleGenerateCode();
  };

  useEffect(() => {
    if (codeStatus === 'expired') {
      const modal = document.getElementById(modalId) as HTMLDialogElement;
      if (modal) modal.close();
      showToast({
        variant: 'success',
        message: 'Nomor anda berhasil terhubung!',
        duration: 3000,
      });
      dispatch(fetchList());
    }
  }, [codeStatus, dispatch, modalId, showToast]);

  return (
    <>
      <Button color="black" className="mr-auto mb-4" onClick={handleConnectWhatsapp}>
        <MetaIcon className="mr-2" /> Hubungkan Nomor
      </Button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              color="black"
              shape="square"
              className="absolute right-4 top-6"
              aria-label="close modal"
            >
              <Cancel01Icon size={20} />
            </Button>
          </form>
          <Typography as="h2" variant="h5" className="card-title mb-2">
            Integrasi Nomor Whatsapp
          </Typography>
          <hr className="mb-4" />
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
            onRefresh={handleGenerateCode}
          />
        </div>
      </dialog>
    </>
  );
}
