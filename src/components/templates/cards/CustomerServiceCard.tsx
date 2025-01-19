'use client';

import {
  Delete02Icon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from 'hugeicons-react';
import { Dropdown } from '@/components/molecules';
import { deleteCustomerService } from '@/actions/customer-service';
import { Avatar, Typography } from '@/components/atoms';
import Link from 'next/link';
import useToast from '@/hooks/useToast';
import { useState } from 'react';

type CustomerServiceItem = {
  id: string | number;
  name: string;
  labels: string;
};
export default function CustomerServiceCard({ items }: { items: CustomerServiceItem[] }) {
  const { showToast } = useToast();
  const [listCustomerService, setListCustomerService] = useState<CustomerServiceItem[]>(items);
  const deleteCS = async (id: string | number) => {
    const response = await deleteCustomerService(id);
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Customer Service berhasil dihapus!',
        placement: 'bottom-center',
      });
      setListCustomerService((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
        placement: 'bottom-center',
      });
    }
  };
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
      {listCustomerService.map((item) => (
        <div
          key={item.id}
          className="relative grid place-items-center py-4 h-40 max-w-36 bg-base-200 border-2 border-primary rounded-2xl"
        >
          <Dropdown
            bgColor="secondary"
            placement="bottom-end"
            menuItems={[
              {
                key: 1,
                label: 'Edit',
                href: `/product-setup/ai-customer-service/${item.id}`,
                icon: <PencilEdit02Icon />,
              },
              {
                key: 2,
                label: 'Delete',
                onClick: () => deleteCS(item.id),
                icon: <Delete02Icon />,
              },
            ]}
            menuSize="sm"
            className="absolute top-2 right-1"
          >
            <MoreVerticalCircle01Icon size={18} />
          </Dropdown>
          <Avatar name={item.name} size="lg" className="mb-2" />
          <Typography variant="body-small" weight="semibold" className="line-clamp-1">
            {item.name}
          </Typography>
          <Typography variant="caption" className="line-clamp-1">
            {item.labels}
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
