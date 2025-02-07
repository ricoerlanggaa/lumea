import { Add01Icon } from 'hugeicons-react';
import { Button } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { Card } from '@/components/organism';
import { TableProductKnowledge } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge' },
];
export default async function ProductKnowledgePage() {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Card title="Product Knowledge" className="h-full overflow-y-auto">
        <Button
          color="black"
          href="/product-setup/product-knowledge/create"
          className="mr-auto mb-4"
        >
          <Add01Icon size={20} className="mr-1" />
          Tambah Knowledge
        </Button>
        <TableProductKnowledge />
      </Card>
    </>
  );
}
