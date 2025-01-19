import { getListProductKnowledge } from '@/actions/product-knowledge';
import { Button, Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { TableProductKnowledge } from '@/components/templates';
import { Add01Icon } from 'hugeicons-react';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge' },
];
export default async function ProductKnowledge() {
  const { data: productKnowledgeList } = await getListProductKnowledge();
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
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
            Tambahkan Product
          </Button>
          <TableProductKnowledge items={productKnowledgeList?.data ?? []} />
        </div>
      </div>
    </>
  );
}
