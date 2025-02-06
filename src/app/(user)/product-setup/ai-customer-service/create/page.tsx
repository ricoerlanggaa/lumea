import { Breadcrumb } from '@/components/molecules';
import { Card } from '@/components/organism';
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
      <Card title="AI Customer Service">
        <FormCustomerService action="create" />
      </Card>
    </>
  );
}
