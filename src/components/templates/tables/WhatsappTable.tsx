'use client';

import { connectWhatsapp, disconnectWhatsapp, removeWhatsapp } from '@/actions/whatsapp';
import { Dropdown } from '@/components/molecules';
import useToast from '@/hooks/useToast';
import { classNames, formatPhoneNumber } from '@/utilities/formats/string';
import {
  Cancel01Icon,
  Delete02Icon,
  Link04Icon,
  MoreHorizontalCircle01Icon,
} from 'hugeicons-react';
import { useState } from 'react';

interface WhatsappItem {
  id: string;
  number: string;
  isConnected: boolean;
}

export default function WhatsappTable({ items }: { items: WhatsappItem[] }) {
  const { showToast } = useToast();
  const [whatsappList, setWhatsappList] = useState<WhatsappItem[]>(items);

  const handleAction = async (
    actionCallback: () => Promise<{ status: boolean; message?: string }>,
    successMessage: string,
    onSuccess: () => void,
  ) => {
    const response = await actionCallback();
    if (response.status) {
      onSuccess();
      showToast({
        variant: 'success',
        message: successMessage,
        placement: 'bottom-center',
      });
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
        placement: 'bottom-center',
      });
    }
  };

  const generateMenuItems = (item: WhatsappItem) => [
    item.isConnected
      ? {
          key: 1,
          label: 'Disconnect',
          icon: <Cancel01Icon />,
          onClick: () =>
            handleAction(
              () => disconnectWhatsapp(item.id),
              'Nomor Whatsapp berhasil terputus!',
              () => {
                setWhatsappList((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === item.id ? { ...prevItem, isConnected: false } : prevItem,
                  ),
                );
              },
            ),
        }
      : {
          key: 1,
          label: 'Connect',
          icon: <Link04Icon />,
          onClick: () =>
            handleAction(
              () => connectWhatsapp(item.id),
              'Nomor Whatsapp berhasil terhubung!',
              () => {
                setWhatsappList((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === item.id ? { ...prevItem, isConnected: true } : prevItem,
                  ),
                );
              },
            ),
        },
    {
      key: 2,
      label: 'Hapus',
      icon: <Delete02Icon />,
      onClick: () =>
        handleAction(
          () => removeWhatsapp(item.id),
          'Nomor Whatsapp berhasil dihapus!',
          () => {
            setWhatsappList((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id));
          },
        ),
    },
  ];

  return (
    <table className="table w-full">
      <thead>
        <tr className="bg-base-200">
          <th className="border">Nomor Whatsapp</th>
          <th className="border">Status</th>
          <th className="border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {whatsappList?.map((item) => (
          <tr key={item.id}>
            <td className="border">
              <span className="line-clamp-1">{formatPhoneNumber(item.number)}</span>
            </td>
            <td className="border">
              <div
                className={classNames(
                  'badge badge-outline',
                  item.isConnected ? 'badge-success' : 'badge-error',
                )}
              >
                {item.isConnected ? 'Connected' : 'Disconnected'}
              </div>
            </td>
            <td className="border text-center">
              <Dropdown placement="bottom-end" menuItems={generateMenuItems(item)} menuSize="sm">
                <MoreHorizontalCircle01Icon size={16} />
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
