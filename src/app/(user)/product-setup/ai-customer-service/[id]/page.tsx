import { type CustomerServiceItem, getCustomerServiceDetail } from '@/actions/customer-service';
import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { FormAICustomerService } from '@/components/templates';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service', href: '/product-setup/ai-customer-service' },
  { key: 3, label: 'Edit' },
];
export default async function EditAICustomerService({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getCustomerServiceDetail(id);
  const { data } = response;
  const customerService: CustomerServiceItem = {
    csAIName: data?.data.name ?? '',
    csAIPersonality: data?.data.personality ?? '',
    label: data?.data.labels,
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
          <FormAICustomerService action="update" value={customerService} />
        </div>
      </div>
    </>
  );
}
