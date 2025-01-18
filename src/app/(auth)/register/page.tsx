import type { Metadata } from 'next';
import Link from 'next/link';
import { Typography } from '@/components/atoms';
import { FormRegister } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Daftar | Lumea AI',
  description:
    'Daftar sekarang di Lumea AI dan tingkatkan pengalaman customer service bisnis Anda. Manfaatkan teknologi AI untuk menangani leads, chat pelanggan, dan closing otomatis.',
  keywords: 'daftar Lumea AI, registrasi platform AI, customer service AI, handle leads otomatis',
};

export default function Register() {
  return (
    <div className="card w-full sm:w-4/5 md:w-3/4 lg:w-[60%]">
      <div className="card-body gap-4">
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
