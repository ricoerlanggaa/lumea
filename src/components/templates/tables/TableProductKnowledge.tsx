'use client';

import { useState } from 'react';
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit02Icon } from 'hugeicons-react';
import { Typography } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
import type {
  TableProductKnowledgeItem,
  TableProductKnowledgeProps,
} from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { formatPhoneNumber } from '@/utilities/formats/string';
import { apiDeleteProductKnowledge } from '@/services';

export default function TableProductKnowledge({ items = [] }: TableProductKnowledgeProps) {
  const { showToast } = useToast();

  const [productKnowledgeList, setProductKnowledgeList] =
    useState<TableProductKnowledgeItem[]>(items);

  const handleDeleteProductKnowledge = async (id: number) => {
    const response = await apiDeleteProductKnowledge(id);
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Product Knowledge berhasil dihapus!',
      });
      setProductKnowledgeList((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };
  return (
    <table className="table w-full">
      <thead>
        <tr className="bg-base-200">
          <th className="border">AI Customer Service</th>
          <th className="border">Nomor Whatsapp</th>
          <th className="border">Label</th>
          <th className="border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {productKnowledgeList?.map((item) => (
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
                    onClick: () => handleDeleteProductKnowledge(item.id),
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
