import { useId, type ReactNode } from 'react';
import Icon from '@mdi/react';
import { mdiCommentQuestionOutline, mdiLogout, mdiMenu } from '@mdi/js';
import { Avatar, Button } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import { SidebarUser } from '@/components/templates';

const menuDropdown = [
  { key: 3, label: 'Help', icon: <Icon path={mdiCommentQuestionOutline} size={1} /> },
  { key: 4, label: 'Logout', icon: <Icon path={mdiLogout} size={1} />, href: '/login' },
];

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const toggleId = useId();
  return (
    <div className="flex flex-col h-screen">
      <header className="navbar bg-primary text-primary-content">
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
        <div className="flex-none">
          <Dropdown placement="bottom-end" bgColor="secondary" menuItems={menuDropdown}>
            <Avatar shape="circle" name="Rico Erlangga" />
          </Dropdown>
        </div>
      </header>
      <div className="grow">
        <div className="drawer md:drawer-open">
          <input id={toggleId} type="checkbox" className="drawer-toggle" />
          <main className="drawer-content bg-base-200 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            {children}
          </main>
          <aside className="drawer-side h-full md:h-[calc(100vh-4rem)] overflow-y-auto">
            <label htmlFor={toggleId} aria-label="close sidebar" className="drawer-overlay" />
            <SidebarUser />
          </aside>
        </div>
      </div>
    </div>
  );
}
