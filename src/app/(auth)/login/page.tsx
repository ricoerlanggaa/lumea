import type { Metadata } from 'next';
import Link from 'next/link';
import { Typography } from '@/components/atoms';
import { FormLogin } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Login | Lumea AI',
  description:
    'Masuk ke akun Lumea AI Anda dan kelola leads serta chat pelanggan secara efisien. Login sekarang untuk memanfaatkan teknologi AI terbaik untuk customer service.',
  keywords: 'login Lumea AI, customer service berbasis AI login, platform AI untuk leads',
};

export default function Login() {
  return (
    <div className="card w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
      <div className="card-body gap-4">
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
