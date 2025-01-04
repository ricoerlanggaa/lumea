import { Button, Typography } from '@/components';

export default function Home() {
  return (
    <section
      className="hero h-[35rem] bg-auto bg-base-content bg-no-repeat bg-bottom"
      style={{ backgroundImage: 'url("/images/banners/polygon-wave.png")' }}
    >
      <div className="hero-content text-base-100 text-center">
        <div className="max-w-sm md:max-w-md lg:max-w-lg">
          <Typography variant="h1">
            <Typography as="strong" color="primary">
              AI Customer Service
            </Typography>
            <br />
            Handle Ribuan Leads
            <br />
            Hingga Closing
          </Typography>
          <Typography variant="body" className="my-4">
            <Typography as="strong" color="primary">
              Lumea AI
            </Typography>{' '}
            merupakan platform Customer Service berbasis AI yang bisa bantu handle leads dan chat
            yang masuk hingga closing dengan cepat dan mudah
          </Typography>
          <Button href="/register" variant="outlined" color="primary" className="mr-2">
            Daftar Sekarang
          </Button>
          <Button href="/about" variant="outlined" color="white">
            Pelajari Selengkapnya
          </Button>
        </div>
      </div>
    </section>
  );
}
