import type { Metadata } from 'next';
import Link from 'next/link';
import { Typography } from '@/components/atoms';
import { FormUserRegister } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Daftar | Lumea AI',
  description:
    'Daftar sekarang di Lumea AI dan tingkatkan pengalaman customer service bisnis Anda. Manfaatkan teknologi AI untuk menangani leads, chat pelanggan, dan closing otomatis.',
  keywords: 'daftar Lumea AI, registrasi platform AI, customer service AI, handle leads otomatis',
};

export default function RegisterPage() {
  return (
    <section className="flex flex-col gap-4 w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
      <Typography as="h1" variant="h2" weight="semibold">
        Daftar
      </Typography>
      <FormUserRegister />
      <Typography className="text-center">
        Already have an account?{' '}
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </Typography>
    </section>
  );
}
