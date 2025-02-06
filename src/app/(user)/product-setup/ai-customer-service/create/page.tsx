import { Typography } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { FormCustomerService } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service', href: '/product-setup/ai-customer-service' },
  { key: 3, label: 'Create' },
];
export default function CreateAICustomerServicePage() {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            AI Customer Service
          </Typography>
          <hr className="mb-4" />
          <FormCustomerService action="create" />
        </div>
      </div>
    </>
  );
}
