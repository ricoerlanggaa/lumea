import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { FormCSAI } from '@/components/templates';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service', href: '/product-setup/ai-customer-service' },
  { key: 3, label: 'Create' },
];
export default function AddAICustomerService() {
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Customer Service
          </Typography>
          <hr className="mb-4" />
          <FormCSAI />
        </div>
      </div>
    </>
  );
}
