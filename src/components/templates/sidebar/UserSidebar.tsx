'use client';

import { usePathname } from 'next/navigation';
import Icon from '@mdi/react';
import {
  mdiAccountSupervisor,
  mdiCommentQuestionOutline,
  mdiLogout,
  mdiViewDashboard,
} from '@mdi/js';
import Menu from '@/components/molecules/menu/Menu';

export default function UserSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { key: 1, label: 'Dashboard', icon: <Icon path={mdiViewDashboard} size={1} />, disabled: true },
    {
      key: 2,
      label: 'Product Setup',
      icon: <Icon path={mdiAccountSupervisor} size={1} />,
      children: [
        {
          key: 21,
          label: 'AI Customer Service',
          href: '/product-setup/ai-customer-service',
          active: pathname === '/product-setup/ai-customer-service',
        },
        {
          key: 22,
          label: 'Product Knowledge',
          href: '/product-setup/product-knowledge',
          active: pathname === '/product-setup/product-knowledge',
        },
      ],
    },
    { key: 3, label: 'Help', icon: <Icon path={mdiCommentQuestionOutline} size={1} /> },
    { key: 4, label: 'Logout', icon: <Icon path={mdiLogout} size={1} />, href: '/login' },
  ];
  return (
    <nav className="w-60 bg-base-100 h-full flex flex-col">
      <Menu items={menuItems} className="grow" />
    </nav>
  );
}
