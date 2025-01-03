import { Button, Typography } from '@/components';

export default function Home() {
  return (
    <section
      className="hero h-[35rem] bg-auto bg-base-content bg-no-repeat bg-bottom"
      style={{ backgroundImage: 'url("/images/banners/polygon-wave.png")' }}
    >
      <div className="hero-content text-base-100 text-center">
        <div className="max-w-lg">
          <Typography variant="h1" color="primary" weight="bold">
            AI Customer Service
          </Typography>
          <Typography as="p" variant="h1" color="secondary" weight="bold">
            Handle Ribuan Leads
          </Typography>
          <Typography as="p" variant="h1" color="secondary" weight="bold" className="mb-6">
            Hingga Closing
          </Typography>
          <Button variant="outlined" color="primary" className="mr-2">
            Daftar Sekarang
          </Button>
          <Button variant="outlined" color="white">
            Pelajari Selengkapnya
          </Button>
        </div>
      </div>
    </section>
  );
}
