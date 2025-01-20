'use client';

import { Typography } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import useToast from '@/hooks/useToast';
import { apiDeleteProductKnowledge } from '@/services';
import { ProductKnowledgeList } from '@/types/services';
import { formatPhoneNumber } from '@/utilities/formats/string';
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit02Icon } from 'hugeicons-react';
import { useState } from 'react';

export default function ProductKnowledgeTable({ items }: { items: ProductKnowledgeList }) {
  const { showToast } = useToast();
  const [productKnowledgeList, setProductKnowledgeList] = useState<ProductKnowledgeList>(items);
  const handleDeleteProductKnowledge = async (id: number) => {
    const response = await apiDeleteProductKnowledge(id);
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Product Knowledge berhasil dihapus!',
        placement: 'bottom-center',
      });
      setProductKnowledgeList((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
        placement: 'bottom-center',
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
            <td className="border">{item.cs_name}</td>
            <td className="border">
              <Typography as="span" className="line-clamp-1">
                {formatPhoneNumber(item.nomor)}
              </Typography>
            </td>
            <td className="border">
              <Typography as="span" className="line-clamp-1">
                {item.label}
              </Typography>
            </td>
            <td className="border text-center">
              <Dropdown
                placement="bottom-end"
                menuItems={[
                  {
                    key: `edit-${item.id}`,
                    label: 'Edit',
                    href: `/product-setup/product-knowledge/${item.id}`,
                    icon: <PencilEdit02Icon />,
                  },
                  {
                    key: item.id,
                    label: 'Hapus',
                    icon: <Delete02Icon />,
                    onClick: () => handleDeleteProductKnowledge(item.id),
                  },
                ]}
                menuSize="sm"
              >
                <MoreHorizontalCircle01Icon size={16} />
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
