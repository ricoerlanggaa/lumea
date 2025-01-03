import { useId, type ReactNode } from 'react';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Menu } from '@/components';

const menuItems = [
  { key: 1, label: 'Features', href: '/features' },
  { key: 2, label: 'Harga', href: '/pricing' },
  { key: 3, label: 'Tentang Lumea', href: '/about' },
];

export default function GuestLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const toggleId = useId();
  return (
    <div className="drawer">
      <input id={toggleId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="navbar fixed bg-primary text-primary-content">
          <div className="flex-none md:hidden">
            <label htmlFor={toggleId} className="drawer-button btn btn-square btn-ghost">
              <Icon path={mdiMenu} size={1} />
            </label>
          </div>
          <div className="flex-1">
            <Button variant="ghost" color="primary" size="sm" className="text-xl" href="/">
              Lumea
            </Button>
          </div>
          <nav className="flex-none hidden md:block">
            <Menu orientation="horizontal" items={menuItems} />
          </nav>
        </header>
        <main>{children}</main>
      </div>
      <aside className="drawer-side">
        <label htmlFor={toggleId} aria-label="close sidebar" className="drawer-overlay" />
        <Menu bgColor="base" className="w-64 min-h-full" items={menuItems} />
      </aside>
    </div>
  );
}
