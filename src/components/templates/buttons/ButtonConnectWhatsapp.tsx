'use client';

import { useId, useState } from 'react';
import { Cancel01Icon, MetaIcon, MoreVerticalCircle01Icon, Settings02Icon } from 'hugeicons-react';
import { Button, QRCode, Typography } from '@/components/atoms';
import useToast from '@/hooks/useToast';
import { apiGetCodeWhatsapp } from '@/services';
import { QRCodeStatus } from '@/types/components/atoms';

export default function ButtonConnectWhatsapp() {
  const modalId = useId();
  const { showToast } = useToast();
  const [qrCodeStatus, setQRCodeStatus] = useState<QRCodeStatus>('loading');
  const [qrCode, setQRCode] = useState('');

  let interval: ReturnType<typeof setInterval> | null = null;
  let countInterval: number = 0;

  const revalidateCodeWhatsapp = async (id: string) => {
    countInterval += 1;
    const response = await apiGetCodeWhatsapp(id);
    const { data } = response;
    if (data?.isConnected && interval) {
      clearInterval(interval);
      showToast({
        variant: 'success',
        message: 'Nomor Whatsapp berhasil terhubung!',
        placement: 'bottom-center',
      });
      const modal = document.getElementById(modalId) as HTMLDialogElement;
      modal.close();
      window.location.reload();
    }
    if (data?.code) {
      setQRCode(data?.code);
    }
    if (countInterval >= 20 && interval) {
      setQRCodeStatus('expired');
      clearInterval(interval);
    }
  };
  const handleConnectWhatsapp = async () => {
    setQRCodeStatus('loading');
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
    const response = await apiGetCodeWhatsapp('');
    if (response.data) {
      setQRCode(response.data.code);
      setQRCodeStatus('active');
      interval = setInterval(() => revalidateCodeWhatsapp(response.data.id), 15000);
    }
  };

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
            value={qrCode}
            size={264}
            status={qrCodeStatus}
            icon="/images/logo/whatsapp.svg"
            iconSize={64}
            className="mx-auto"
            onRefresh={handleConnectWhatsapp}
          />
        </div>
      </dialog>
    </>
  );
}
