import { Breadcrumb } from '@/components/molecules';
import { Card } from '@/components/organism';
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
      <Card title="Edit AI Customer Service" className="h-full overflow-y-auto">
        <FormCustomerService itemId={id} action="update" />
      </Card>
    </>
  );
}
