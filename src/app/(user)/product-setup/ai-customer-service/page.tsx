import Link from 'next/link';
import { Button, Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { MetaIcon, PlusSignIcon } from 'hugeicons-react';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default function AiCustomerService() {
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Daftar CS AI
            </Typography>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              <Link
                href="/product-setup/ai-customer-service/add"
                className="card h-32 max-w-28 bg-base-200 border-primary hover:cursor-pointer items-center border-2 border-dashed"
              >
                <PlusSignIcon size={32} className="my-auto" />
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Integrasi Nomor Whatsapp
            </Typography>
            <hr className="mb-4" />
            <Button color="black" className="mr-auto">
              <MetaIcon className="mr-2" /> Hubungkan Nomor
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
