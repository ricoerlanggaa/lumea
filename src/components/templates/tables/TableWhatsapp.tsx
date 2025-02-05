'use client';

import {
  Cancel01Icon,
  Delete02Icon,
  Link04Icon,
  MoreHorizontalCircle01Icon,
} from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import useToast from '@/hooks/useToast';
import { classNames, formatPhoneNumber } from '@/utilities/formats/string';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  connectNumber,
  deleteNumber,
  disconnectNumber,
  fetchList,
  listState,
} from '@/store/whatsappSlice';
import { useEffect } from 'react';

export default function TableWhatsapp() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(listState);

  const { showToast } = useToast();

  const handleConnect = async (id: string) => {
    try {
      await dispatch(connectNumber(id)).unwrap();
      showToast({
        variant: 'success',
        message: 'Nomor whatsapp berhasil terhubung!',
        duration: 3000,
      });
    } catch (error) {
      showToast({
        variant: 'error',
        message: String(error),
        duration: 3000,
      });
    }
  };
  const handleDisconnect = async (id: string) => {
    try {
      await dispatch(disconnectNumber(id)).unwrap();
      showToast({
        variant: 'success',
        message: 'Nomor whatsapp berhasil terputus!',
        duration: 3000,
      });
    } catch (error) {
      showToast({
        variant: 'error',
        message: String(error),
        duration: 3000,
      });
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteNumber(id)).unwrap();
      showToast({
        variant: 'success',
        message: 'Nomor whatsapp berhasil dihapus!',
        duration: 3000,
      });
    } catch (error) {
      showToast({
        variant: 'error',
        message: String(error),
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

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
        {list.map((item) => (
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
              <DropdownMenu
                placement="bottom-end"
                items={[
                  {
                    key: `edit-${Math.random()}`,
                    label: item.status ? 'Disconnect' : 'Connect',
                    icon: item.status ? <Cancel01Icon /> : <Link04Icon />,
                    onClick: () =>
                      item.status ? handleDisconnect(item.id) : handleConnect(item.id),
                  },
                  {
                    key: `delete-${Math.random()}`,
                    label: 'Delete',
                    icon: <Delete02Icon />,
                    onClick: () => handleDelete(item.id),
                  },
                ]}
                size="sm"
              >
                <MoreHorizontalCircle01Icon size={16} />
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
