import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { Typography } from '@/components/atoms';

export default function AiCustomerService() {
  return (
    <div className="card h-full overflow-y-auto bg-base-100">
      <div className="card-body">
        <Typography as="h1" variant="h3" weight="bold" className="card-title">
          AI Customer Service
        </Typography>
        <div className="divider my-1" />
        <Typography as="h2" variant="h4" weight="normal" className="card-title mb-4">
          Daftar CS AI
        </Typography>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          <Link
            href="/product-setup/ai-customer-service/add"
            className="card h-32 max-w-32 bg-base-200 border-primary hover:cursor-pointer items-center border-2 border-dashed"
          >
            <Icon path={mdiPlus} size={2} className="my-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
