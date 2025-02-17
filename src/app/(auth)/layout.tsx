import type { ReactNode } from 'react';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { Button } from '@/components/atoms';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="grid md:grid-cols-5 h-screen bg-primary">
      <Button href="/" variant="ghost" shape="square" className="absolute top-1 left-0">
        <ArrowLeft02Icon className="text-base-content md:text-primary-content" />
      </Button>
      <aside
        className="hidden md:block md:col-span-2 bg-auto bg-no-repeat bg-bottom"
        style={{ backgroundImage: 'url("/images/banners/polygon-wave.png")' }}
      />
      <main className="md:col-span-3 md:rounded-l-2xl grid place-items-center py-8 bg-base-100 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
