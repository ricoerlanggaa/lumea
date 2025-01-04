import type { Metadata } from 'next';
import Link from 'next/link';
import { Typography } from '@/components/atoms';
import { FormRegister } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Daftar Akun — Lumea',
};

export default function Register() {
  return (
    <div className="card w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
      <div className="card-body">
        <Typography as="h1" variant="h2" weight="semibold">
          Daftar
        </Typography>
        <FormRegister />
        <Typography className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}
