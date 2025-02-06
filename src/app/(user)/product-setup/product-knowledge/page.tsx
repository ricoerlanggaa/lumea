import { Add01Icon } from 'hugeicons-react';
import { Button, Typography } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { TableProductKnowledge } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge' },
];
export default async function ProductKnowledgePage() {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Product Knowledge
          </Typography>
          <hr className="mb-4" />
          <Button
            color="black"
            href="/product-setup/product-knowledge/create"
            className="mr-auto mb-4"
          >
            <Add01Icon size={18} className="mr-2" />
            Tambahkan Knowledge
          </Button>
          <TableProductKnowledge />
        </div>
      </div>
    </>
  );
}
