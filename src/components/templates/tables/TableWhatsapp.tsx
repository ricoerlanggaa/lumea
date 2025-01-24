'use client';

import { useState } from 'react';
import {
  Cancel01Icon,
  Delete02Icon,
  Link04Icon,
  MoreHorizontalCircle01Icon,
} from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import type { TableWhatsappItem, TableWhatsappProps } from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { classNames, formatPhoneNumber } from '@/utilities/formats/string';
import { apiConnectWhatsapp, apiDeleteWhatsapp, apiDisconnectWhatsapp } from '@/services';

export default function TableWhatsapp({ items = [] }: TableWhatsappProps) {
  const { showToast } = useToast();

  const [whatsappList, setWhatsappList] = useState<TableWhatsappItem[]>(items);

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
      });
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };

  const generateMenuItems = (item: TableWhatsappItem) => [
    item.status === 'connected'
      ? {
          key: 1,
          label: 'Disconnect',
          icon: <Cancel01Icon />,
          onClick: () =>
            handleAction(
              () => apiDisconnectWhatsapp(item.id),
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
              () => apiConnectWhatsapp(item.id),
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
          () => apiDeleteWhatsapp(item.id),
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
        {whatsappList.map((item) => (
          <tr key={item.id}>
            <td className="border">
              <span className="line-clamp-1">{formatPhoneNumber(item.number)}</span>
            </td>
            <td className="border">
              <div
                className={classNames(
                  'badge badge-outline capitalize',
                  item.status === 'connected' ? 'badge-success' : 'badge-error',
                )}
              >
                {item.status}
              </div>
            </td>
            <td className="border text-center">
              <DropdownMenu placement="bottom-end" items={generateMenuItems(item)} size="sm">
                <MoreHorizontalCircle01Icon size={16} />
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
