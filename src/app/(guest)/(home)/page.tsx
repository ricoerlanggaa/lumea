import type { Metadata } from 'next';
import { Button, Typography } from '@/components/atoms';
import { Card } from '@/components/organism';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight02Icon } from 'hugeicons-react';

export const metadata: Metadata = {
  title: 'Lumea AI - Solusi Customer Service Berbasis AI untuk Leads Hingga Closing',
  description:
    'Tingkatkan produktivitas bisnis Anda dengan Lumea AI, platform customer service berbasis AI yang membantu menangani leads, chat masuk, hingga proses closing. Optimalkan efisiensi dan tingkatkan kepuasan pelanggan.',
  keywords:
    'AI Customer Service, platform AI untuk bisnis, handle leads otomatis, chat AI hingga closing, Lumea AI',
};

export default function HomePage() {
  return (
    <>
      <section
        id="banner"
        className="hero h-[35rem] bg-auto bg-base-content bg-no-repeat bg-bottom"
        style={{ backgroundImage: 'url("/images/banners/polygon-wave.png")' }}
      >
        <div className="hero-content text-center">
          <article className="flex flex-col gap-2 md:gap-2 max-w-lg md:max-w-xl lg:max-w-2xl">
            <Typography variant="h1" color="primary">
              AI Customer Service
            </Typography>
            <Typography variant="h3" className="mb-2">
              Balas Chat WhatsApp Tanpa Ribet & Biaya Mahal
            </Typography>
            <Typography variant="body" className="mb-4">
              <Typography as="strong" color="primary">
                Lumea AI
              </Typography>{' '}
              merupakan platform Customer Service berbasis AI yang bisa bantu handle leads dan chat
              yang masuk hingga closing dengan cepat dan mudah
            </Typography>
            <nav>
              <Button href="/register" variant="outlined" color="primary" className="mr-2">
                Daftar Sekarang
              </Button>
              <Button href="/about" variant="outlined" color="white">
                Pelajari Selengkapnya
              </Button>
            </nav>
          </article>
        </div>
      </section>
      <section
        id="feature"
        className="py-16 bg-base-100 text-base-content flex flex-col gap-4 md:gap-8 items-center text-center rounded-2xl"
      >
        <article className="flex flex-col gap-2 md:gap-4 max-w-lg md:max-w-xl lg:max-w-2xl">
          <Typography variant="h3">Bisnis Kamu Punya Masalah ini?</Typography>
          <Typography variant="body">
            Capek harus balas chat Pelanggan satu per satu, Hiring CS mahal, belum lagi Gaji, THR,
            dan Bonus? Saatnya pakai Lume.ai, asisten AI yang siap membalas chat otomatis, 24/7,
            tanpa lelah!
          </Typography>
        </article>
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <Card bgColor="primary">
            <Typography variant="h5">Chat Menumpuk?</Typography>
            <Typography variant="body">Lume.ai balas otomatis dalam hitungan detik!</Typography>
          </Card>
          <Card bgColor="primary">
            <Typography variant="h5">Hiring CS Mahal</Typography>
            <Typography variant="body">Lume.ai balas otomatis dalam hitungan detik!</Typography>
          </Card>
          <Card bgColor="primary">
            <Typography variant="h5">Pelanggan Pergi?</Typography>
            <Typography variant="body">Lume.ai balas otomatis dalam hitungan detik!</Typography>
          </Card>
        </div>
      </section>
      <section
        id="pricing"
        className="bg-auto bg-no-repeat bg-center py-16 flex flex-col gap-8 items-center"
        style={{ backgroundImage: 'url("/images/banners/white-circle-shape.png")' }}
      >
        <article className="flex flex-col gap-2 max-w-lg md:max-w-xl lg:max-w-2xl text-center">
          <Typography variant="h3">
            Bisnis Efesien dengan{' '}
            <Typography as="strong" color="primary">
              Lume.ai
            </Typography>
          </Typography>
          <Typography variant="h5">Automasi Chat, Hemat Waktu, Tingkatkan Penjualan!</Typography>
        </article>
        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <Card bgColor="base" className="flex flex-col gap-4">
            <div className="inline-flex items-center">
              <div className="bg-primary rounded-2xl p-2 mr-4">
                <Image
                  src="/images/icons/basic-package.svg"
                  alt="basic package"
                  width={40}
                  height={40}
                />
              </div>
              <article>
                <Typography variant="h5">Lume.ai Basic</Typography>
                <Typography variant="body">Cocok untuk Bisnis Kecil</Typography>
              </article>
            </div>
            <article className="text-center">
              <Typography variant="body">Hanya :</Typography>
              <Typography as="p" variant="h1" className="mb-2">
                <Typography as="sup" variant="body">
                  Rp{' '}
                </Typography>
                <Typography as="strong">39.000</Typography>
                <Typography as="sub" variant="body">
                  {' '}
                  /bulan
                </Typography>
              </Typography>
              <Typography as="strong" variant="h5">
                2 Customer Service AI
              </Typography>
            </article>
            <ul className="list-none leading-loose px-2">
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Balas Chat 24/7
                </strong>
              </li>
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Bantu Closing Lebih Cepat
                </strong>
              </li>
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Hemat Biaya CS
                </strong>
              </li>
              <li>
                <span className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Respon Super Cepat
                </span>
              </li>
              <li>
                <span className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Mudah Digunakan
                </span>
              </li>
            </ul>
            <Button color="primary" shape="block">
              Pilih Paket
            </Button>
          </Card>
          <Card bgColor="base" className="flex flex-col gap-4">
            <div className="inline-flex items-center">
              <div className="bg-primary rounded-2xl p-2 mr-4">
                <Image
                  src="/images/icons/basic-package.svg"
                  alt="basic package"
                  width={40}
                  height={40}
                />
              </div>
              <article>
                <Typography variant="h5">Lume.ai Premium</Typography>
                <Typography variant="body">Untuk Bisnis yang lebih besar</Typography>
              </article>
            </div>
            <article className="text-center">
              <Typography variant="body">Hanya :</Typography>
              <Typography as="p" variant="h1" className="mb-2">
                <Typography as="sup" variant="body">
                  Rp{' '}
                </Typography>
                <Typography as="strong">79.000</Typography>
                <Typography as="sub" variant="body">
                  {' '}
                  /bulan
                </Typography>
              </Typography>
              <Typography as="strong" variant="h5">
                4 Customer Service AI
              </Typography>
            </article>
            <ul className="list-none leading-loose px-2">
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Balas Chat 24/7
                </strong>
              </li>
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Bantu Closing Lebih Cepat
                </strong>
              </li>
              <li>
                <strong className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Hemat Biaya CS
                </strong>
              </li>
              <li>
                <span className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Respon Super Cepat
                </span>
              </li>
              <li>
                <span className="inline-flex items-center">
                  <Image
                    src="/images/icons/check-gradient-circle.svg"
                    alt="checkmark"
                    className="mr-2"
                    width={24}
                    height={24}
                  />
                  Mudah Digunakan
                </span>
              </li>
            </ul>
            <Button color="primary" shape="block">
              Pilih Paket
            </Button>
          </Card>
        </div>
      </section>
      <section
        id="testimonial"
        className="grid md:grid-cols-3 bg-base-100 text-base-content rounded-2xl"
      >
        <figure
          className="hidden md:block bg-auto bg-no-repeat bg-left"
          style={{ backgroundImage: 'url("/images/banners/half-circle-white.png")' }}
        />
        <article className="flex flex-col mx-auto md:col-span-2 py-16 mb-8">
          <Typography variant="h5">Testimoni</Typography>
          <Typography variant="h3" className="mb-8">
            Apa Kata Mereka?
          </Typography>
          <div className="inline-flex items-center">
            <Image
              src="/images/illustrations/testimoni-doni.png"
              alt="testimoni doni"
              className="mr-4"
              width={180}
              height={180}
            />
            <div className="flex flex-col justify-between h-full max-w-sm md:max-w-md">
              <div>
                <Typography variant="body-large" weight="semibold">
                  Doni
                </Typography>
                <Typography variant="body">UMKM - Thrift Seller</Typography>
              </div>
              <Typography variant="body">
                Udah ga perlu hire banyak CS, tinggal butuh CS yang bisa monitor Closingan dan
                follow-up, yang jelas ngebantu hemat uang, Lume.ai bikin hemat dan efisien kerjaan.
              </Typography>
              <Link href="/" className="inline-flex items-center hover:underline">
                Next
                <ArrowRight02Icon size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
