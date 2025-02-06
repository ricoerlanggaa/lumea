import { Typography } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
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
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Edit Product Knowledge
          </Typography>
          <hr className="mb-4" />
          <FormProductKnowledge action="update" itemId={id} />
        </div>
      </div>
    </>
  );
}
