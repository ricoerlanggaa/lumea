'use client';

import { useEffect } from 'react';
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit02Icon } from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import { Table } from '@/components/organism';
import type { TableColumns } from '@/types/components/organisms';
import useToast from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { deleteItem, fetchList, listState } from '@/store/productKnowledgeSlice';
import { formatPhoneNumber } from '@/utilities/formats/string';

export default function TableProductKnowledge() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(listState);

  const { showToast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteItem(id)).unwrap();
      showToast({
        variant: 'success',
        message: 'Product Knowledge berhasil dihapus!',
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
  const action = (id: number) => (
    <DropdownMenu
      placement="bottom-end"
      items={[
        {
          key: `edit-${id}`,
          label: 'Edit',
          href: `/product-setup/product-knowledge/${id}`,
          icon: <PencilEdit02Icon />,
        },
        {
          key: `delete-${id}`,
          label: 'Hapus',
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
    { key: 'customerServiceName', label: 'Customer Service' },
    { key: 'whatsappNumber', label: 'Nomor Whatsapp' },
    { key: 'label', label: 'Label' },
    { key: 'action', label: 'Aksi', align: 'center' },
  ];
  const items = list.map((item) => ({
    key: item.id,
    customerServiceName: item.customerServiceName,
    whatsappNumber: formatPhoneNumber(item.whatsappNumber),
    label: item.label,
    action: action(item.id),
  }));

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return <Table columns={columns} items={items} />;
}
