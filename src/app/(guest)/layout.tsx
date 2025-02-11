import { useId, type ReactNode } from 'react';
import { Button } from '@/components/atoms';
import { Menu } from '@/components/molecules';
import { Facebook01Icon, InstagramIcon, Menu02Icon, WhatsappIcon } from 'hugeicons-react';
import Link from 'next/link';

const menuItems = [
  { key: 1, label: 'Features', href: '#feature' },
  { key: 2, label: 'Harga', href: '#pricing' },
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
        <header className="fixed z-10 w-full bg-primary text-primary-content">
          <div className="navbar max-w-6xl mx-auto">
            <div className="flex-none md:hidden">
              <label htmlFor={toggleId} className="drawer-button btn btn-square btn-ghost">
                <Menu02Icon />
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
          </div>
        </header>
        <main className="bg-primary text-primary-content">{children}</main>
        <footer className="footer bg-primary text-primary-content p-10">
          <aside>
            <Button variant="ghost" color="primary" className="p-0 text-2xl" href="/">
              Lumea
            </Button>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <Link href="#pricing">Penawaran Lumea</Link>
            <Link href="#testimonial">Testimoni</Link>
            <Link href="#feature">Fitur</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Pages</h6>
            <Link href="/">Homepage</Link>
            <Link href="/register">Daftar</Link>
            <Link href="/login">Masuk</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Social Media</h6>
            <div className="grid grid-flow-col gap-4">
              <Link href="/">
                <InstagramIcon />
              </Link>
              <Link href="/">
                <Facebook01Icon />
              </Link>
              <Link href="/">
                <WhatsappIcon />
              </Link>
            </div>
          </nav>
        </footer>
      </div>
      <aside className="drawer-side">
        <label htmlFor={toggleId} aria-label="close sidebar" className="drawer-overlay" />
        <Menu bgColor="base" className="w-64 min-h-full" items={menuItems} />
      </aside>
    </div>
  );
}
