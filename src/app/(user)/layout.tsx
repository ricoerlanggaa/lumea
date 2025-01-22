'use client';

import { useId, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  DashboardSquare01Icon,
  HelpCircleIcon,
  Logout03Icon,
  Menu02Icon,
  UserMultipleIcon,
} from 'hugeicons-react';
import { Button } from '@/components/atoms';
import { Menu } from '@/components/molecules';
import type { MenuItem } from '@/types/components/molecules';
import { apiUserLogout } from '@/services';

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const toggleId = useId();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { key: 1, label: 'Dashboard', icon: <DashboardSquare01Icon />, status: 'disabled' },
    {
      key: 2,
      label: 'Product Setup',
      icon: <UserMultipleIcon />,
      children: [
        {
          key: 21,
          label: 'AI Customer Service',
          href: '/product-setup/ai-customer-service',
          status: pathname.includes('/product-setup/ai-customer-service') ? 'active' : 'none',
        },
        {
          key: 22,
          label: 'Product Knowledge',
          href: '/product-setup/product-knowledge',
          status: pathname.includes('/product-setup/product-knowledge') ? 'active' : 'none',
        },
      ],
    },
    { key: 3, label: 'Help', icon: <HelpCircleIcon /> },
    { key: 4, label: 'Logout', icon: <Logout03Icon />, onClick: () => apiUserLogout() },
  ];
  return (
    <div className="drawer lg:drawer-open">
      <input id={toggleId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="navbar bg-base-200">
          <div className="flex-none">
            <label htmlFor={toggleId} className="btn btn-ghost btn-square">
              <Menu02Icon />
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
