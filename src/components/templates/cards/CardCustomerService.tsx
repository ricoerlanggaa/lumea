'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Delete02Icon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from 'hugeicons-react';
import { DropdownMenu } from '@/components/molecules';
import { Avatar, Typography } from '@/components/atoms';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { deleteItem, fetchList, listState } from '@/store/customerServiceSlice';

export default function CardCustomerService() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(listState);

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 min-[512px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
      {list.map((item) => (
        <div
          key={item.id}
          className="relative grid place-items-center py-4 h-40 max-w-36 bg-base-200 border border-primary rounded-xl"
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
                onClick: () => handleDelete(item.id),
                icon: <Delete02Icon />,
              },
            ]}
            size="sm"
            className="absolute top-2 right-1"
          >
            <MoreVerticalCircle01Icon size={20} />
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
        className=" flex flex-col items-center h-40 max-w-36 bg-base-200 rounded-xl border-2 border-primary border-dashed hover:cursor-pointer"
        aria-label="create ai customer service"
      >
        <PlusSignIcon size={42} className="my-auto" />
      </Link>
    </div>
  );
}
