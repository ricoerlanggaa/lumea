import type { ReactNode } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

import { Button } from '@/components/atoms';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="grid md:grid-cols-5 h-screen bg-base-content">
      <Button href="/" variant="ghost" className="absolute top-1 left-0">
        <Icon path={mdiArrowLeft} size={1} className="text-base-content md:text-base-100" />
      </Button>
      <aside
        className="hidden md:block md:col-span-2 bg-auto bg-no-repeat bg-bottom"
        style={{ backgroundImage: 'url("/images/banners/polygon-wave.png")' }}
      />
      <main className="md:col-span-3 md:rounded-l-2xl bg-base-100  flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
