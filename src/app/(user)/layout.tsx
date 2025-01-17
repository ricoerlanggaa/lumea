'use client';

import { useId, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@mdi/react';
import {
  mdiAccountSupervisor,
  mdiCommentQuestionOutline,
  mdiLogout,
  mdiMenu,
  mdiViewDashboard,
} from '@mdi/js';
import { Button } from '@/components/atoms';
import { Menu } from '@/components/molecules';

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const toggleId = useId();
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
          active: pathname.includes('/product-setup/ai-customer-service'),
        },
        {
          key: 22,
          label: 'Product Knowledge',
          href: '/product-setup/product-knowledge',
          active: pathname.includes('/product-setup/product-knowledge'),
        },
      ],
    },
    { key: 3, label: 'Help', icon: <Icon path={mdiCommentQuestionOutline} size={1} /> },
    { key: 4, label: 'Logout', icon: <Icon path={mdiLogout} size={1} />, href: '/login' },
  ];
  return (
    <div className="drawer lg:drawer-open">
      <input id={toggleId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="navbar bg-base-200">
          <div className="flex-none">
            <label htmlFor={toggleId} className="btn btn-ghost btn-square">
              <Icon path={mdiMenu} size={1} className="text-base-content" />
            </label>
          </div>
        </header>
        <main className="bg-base-200 flex flex-col h-[calc(100vh-4rem)] px-4">{children}</main>
      </div>
      <aside className="drawer-side">
        <label htmlFor={toggleId} aria-label="close sidebar" className="drawer-overlay" />
        <nav className="min-h-full bg-primary w-64 py-4">
          <Button variant="ghost" size="sm" className="text-2xl mx-4 mb-5" href="/">
            Lumea
          </Button>
          <Menu items={menuItems} bgColor="primary" />
        </nav>
      </aside>
    </div>
  );
}
