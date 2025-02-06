'use client';

import { useEffect } from 'react';
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit02Icon } from 'hugeicons-react';
import { Typography } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
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

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return (
    <table className="table w-full">
      <thead>
        <tr className="bg-base-200">
          <th className="border">Customer Service</th>
          <th className="border">Nomor Whatsapp</th>
          <th className="border">Label</th>
          <th className="border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td className="border">{item.customerServiceName}</td>
            <td className="border">
              <Typography as="span" className="line-clamp-1">
                {formatPhoneNumber(item.whatsappNumber)}
              </Typography>
            </td>
            <td className="border">
              <Typography as="span" className="line-clamp-1">
                {item.label}
              </Typography>
            </td>
            <td className="border text-center">
              <DropdownMenu
                placement="bottom-end"
                items={[
                  {
                    key: `edit-${item.id}`,
                    label: 'Edit',
                    href: `/product-setup/product-knowledge/${item.id}`,
                    icon: <PencilEdit02Icon />,
                  },
                  {
                    key: `delete-${item.id}`,
                    label: 'Hapus',
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
