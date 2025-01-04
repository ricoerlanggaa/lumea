import type { Metadata } from 'next';
import Link from 'next/link';
import { FormLogin, Typography } from '@/components';

export const metadata: Metadata = {
  title: 'Login — Lumea',
};

export default function Login() {
  return (
    <div className="card w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
      <div className="card-body">
        <Typography as="h1" variant="h2" weight="semibold">
          Masuk
        </Typography>
        <FormLogin />
        <Typography className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </Typography>
      </div>
    </div>
  );
}
