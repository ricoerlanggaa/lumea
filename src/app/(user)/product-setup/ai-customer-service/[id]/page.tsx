import { Typography } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { FormCustomerService } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service', href: '/product-setup/ai-customer-service' },
  { key: 3, label: 'Edit' },
];
export default async function EditAICustomerServicePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Edit AI Customer Service
          </Typography>
          <hr className="mb-4" />
          <FormCustomerService itemId={id} action="update" />
        </div>
      </div>
    </>
  );
}
