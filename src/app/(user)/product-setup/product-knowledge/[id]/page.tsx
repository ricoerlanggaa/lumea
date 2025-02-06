import { Breadcrumb } from '@/components/molecules';
import { Card } from '@/components/organism';
import { FormProductKnowledge } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge', href: '/product-setup/product-knowledge' },
  { key: 3, label: 'Edit' },
];
export default async function EditProductKnowledgePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Card title="Edit Product Knowledge" className="h-full overflow-y-auto">
        <FormProductKnowledge action="update" itemId={id} />
      </Card>
    </>
  );
}
