'use client';

import {
  Delete02Icon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import { Avatar, Typography } from '@/components/atoms';
import Link from 'next/link';
import useToast from '@/hooks/useToast';
import { useState } from 'react';
import { apiDeleteCustomerService } from '@/services';
import { CardCustomerServiceItem, CardCustomerServiceProps } from '@/types/components/templates';

export default function CardCustomerService({ items = [] }: CardCustomerServiceProps) {
  const { showToast } = useToast();
  const [customerServiceList, setCustomerServiceList] = useState<CardCustomerServiceItem[]>(items);

  const handleDeleteCustomerService = async (id: number) => {
    const response = await apiDeleteCustomerService(id);
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Customer Service berhasil dihapus!',
      });
      setCustomerServiceList((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };
  return (
    <div className="grid grid-cols-2 min-[512px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
      {customerServiceList.map((item) => (
        <div
          key={item.id}
          className="relative grid place-items-center py-4 h-40 max-w-36 bg-base-200 border-2 border-primary rounded-2xl"
        >
          <DropdownMenu
            bgColor="secondary"
            placement="bottom-end"
            items={[
              {
                key: `edit-${item.id}`,
                label: 'Edit',
                href: `/product-setup/ai-customer-service/${item.id}`,
                icon: <PencilEdit02Icon />,
              },
              {
                key: `delete-${item.id}`,
                label: 'Delete',
                onClick: () => handleDeleteCustomerService(item.id),
                icon: <Delete02Icon />,
              },
            ]}
            size="sm"
            className="absolute top-2 right-1"
          >
            <MoreVerticalCircle01Icon size={18} />
          </DropdownMenu>
          <Avatar alt={item.name} size="lg" className="mb-2" />
          <Typography variant="body-small" weight="semibold" className="line-clamp-1">
            {item.name}
          </Typography>
          <Typography variant="caption" className="line-clamp-1">
            {item.label}
          </Typography>
        </div>
      ))}
      <Link
        href="/product-setup/ai-customer-service/create"
        className="card h-40 max-w-36 bg-base-200 border-primary hover:cursor-pointer items-center border-2 border-dashed"
        aria-label="create ai customer service"
      >
        <PlusSignIcon size={42} className="my-auto" />
      </Link>
    </div>
  );
}
