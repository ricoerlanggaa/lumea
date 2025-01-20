import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { FormCustomerService } from '@/components/templates';
import { apiGetCustomerServiceDetail } from '@/services';
import type { CustomerServiceItem } from '@/types/services';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service', href: '/product-setup/ai-customer-service' },
  { key: 3, label: 'Edit' },
];
export default async function EditAICustomerService({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await apiGetCustomerServiceDetail(id);

  const customerService: CustomerServiceItem = {
    name: response.data?.name ?? '',
    label: response.data?.labels,
    personality: response.data?.personality ?? '',
  };
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Edit AI Customer Service
          </Typography>
          <hr className="mb-4" />
          <FormCustomerService id={id} action="update" value={customerService} />
        </div>
      </div>
    </>
  );
}
