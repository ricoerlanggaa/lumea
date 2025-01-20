'use client';

import { useId, useState } from 'react';
import { Cancel01Icon, MetaIcon } from 'hugeicons-react';
import { Button, Typography } from '@/components/atoms';
import { QRCodeCanvas } from 'qrcode.react';
import useToast from '@/hooks/useToast';
import { apiGenerateCodeWhatsapp } from '@/services';

export default function ConnectWhatsappButton() {
  const modalId = useId();
  const { showToast } = useToast();
  const [qrCode, setQRCode] = useState('');

  let interval: ReturnType<typeof setInterval> | null = null;

  const refreshQRCodeWhatsapp = async (id: string) => {
    const response = await apiGenerateCodeWhatsapp(id);
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
  };
  const handleConnectWhatsapp = async () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
    const response = await apiGenerateCodeWhatsapp('');
    if (response.data) {
      setQRCode(response.data.code);
      interval = setInterval(() => refreshQRCodeWhatsapp(response.data.id), 15000);
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
              <Cancel01Icon size={18} />
            </Button>
          </form>
          <Typography as="h2" variant="h5" className="card-title mb-2">
            Integrasi Nomor Whatsapp
          </Typography>
          <hr className="mb-4" />
          <ol className="list-decimal list-inside mb-4">
            <li>Buka aplikasi WhatsApp Kamu.</li>
            <li>
              Klik <b>3-dots</b> menu di pojok kanan atas.
            </li>
            <li>
              Pilih <b>Perangkat Tertaut</b>
            </li>
            <li>
              Klik <b>Tautkan Perangkat</b>
            </li>
          </ol>
          <Typography className="text-center mx-auto max-w-72 mb-4">
            Scan QR di bawah ini menggunakan aplikasi WhatsApp kamu
          </Typography>
          {qrCode && <QRCodeCanvas value={qrCode} size={240} className="mx-auto mb-4" />}
        </div>
      </dialog>
    </>
  );
}
