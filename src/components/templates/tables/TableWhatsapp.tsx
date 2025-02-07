'use client';

import { useEffect } from 'react';
import {
  Cancel01Icon,
  Delete02Icon,
  Link04Icon,
  MoreHorizontalCircle01Icon,
} from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import { TableColumns } from '@/types/components/organisms';
import { Table } from '@/components/organism';
import useToast from '@/hooks/useToast';
import { formatPhoneNumber } from '@/utilities/formats/string';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  connectNumber,
  deleteNumber,
  disconnectNumber,
  fetchList,
  listState,
} from '@/store/whatsappSlice';
import { Badge } from '@/components/atoms';

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
  const action = (id: string, type: 'connect' | 'disconnect') => (
    <DropdownMenu
      placement="bottom-end"
      items={[
        {
          key: `edit-${id}`,
          label: type === 'connect' ? 'Connect' : 'Disconnect',
          icon: type === 'connect' ? <Link04Icon /> : <Cancel01Icon />,
          onClick: () => (type === 'connect' ? handleConnect(id) : handleDisconnect(id)),
        },
        {
          key: `delete-${id}`,
          label: 'Delete',
          icon: <Delete02Icon />,
          onClick: () => handleDelete(id),
        },
      ]}
      size="sm"
    >
      <MoreHorizontalCircle01Icon size={16} />
    </DropdownMenu>
  );
  const columns: TableColumns<string> = [
    { key: 'whatsappNumber', label: 'Nomor Whatsapp' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Aksi', align: 'center' },
  ];
  const items = list.map((item) => ({
    key: item.id,
    whatsappNumber: formatPhoneNumber(item.number),
    status: (
      <Badge color={item.status === 'connected' ? 'success' : 'error'} outline>
        {item.status}
      </Badge>
    ),
    action: action(item.id, item.status === 'connected' ? 'disconnect' : 'connect'),
  }));

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return <Table columns={columns} items={items} />;
}
