'use client';

import { useId, useState } from 'react';
import { Cancel01Icon, MetaIcon } from 'hugeicons-react';
import { Button, Typography } from '@/components/atoms';
import { QRCodeCanvas } from 'qrcode.react';
import { generateQRCodeWhatsapp } from '@/actions/whatsapp';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

export default function ConnectWhatsappButton() {
  const modalId = useId();
  const router = useRouter();
  const { showToast } = useToast();
  const [qrCode, setQRCode] = useState('');

  let interval: ReturnType<typeof setInterval> | null = null;
  const modal = document.getElementById(modalId) as HTMLDialogElement;

  const handleQRCodeWhatsapp = async (id: string) => {
    const response = await generateQRCodeWhatsapp(id);
    const { data } = response;
    if (data?.data.isConnected && interval) {
      clearInterval(interval);
      showToast({
        variant: 'success',
        message: 'Nomor Whatsapp berhasil terhubung!',
        placement: 'bottom-center',
      });
      modal.close();
      router.refresh();
    }
    if (data?.data.code) {
      setQRCode(data?.data.code);
    }
  };
  const handleConnectWhatsapp = async () => {
    if (modal) modal.showModal();
    try {
      const response = await generateQRCodeWhatsapp('');
      const { data } = response;
      if (data?.data) {
        setQRCode(data.data.code);
        interval = setInterval(() => handleQRCodeWhatsapp(data.data.id), 15000);
      }
      return data;
    } catch (error) {
      return error;
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
