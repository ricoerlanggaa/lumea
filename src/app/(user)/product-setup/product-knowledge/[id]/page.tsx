import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { FormProductKnowledge } from '@/components/templates';
import { formatPhoneNumber } from '@/utilities/formats/string';
import {
  apiGetCustomerServiceSelectList,
  apiGetProductKnowledgeDetail,
  apiGetWhatsappSelectList,
} from '@/services';
import type { ProductKnowledgeItem } from '@/types/services';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge', href: '/product-setup/product-knowledge' },
  { key: 3, label: 'Edit' },
];
export default async function EditProductKnowledge({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await apiGetProductKnowledgeDetail(id);
  const { data } = response;
  const productKnowledge: ProductKnowledgeItem = {
    customerServiceId: data?.cs_id ?? 0,
    whatsappId: data?.number_id ?? '',
    description: data?.description ?? '',
  };
  const customerServiceSelectList = await apiGetCustomerServiceSelectList();
  const customerServiceItems = customerServiceSelectList.data?.map((item) => ({
    key: String(item.id),
    label: item.name,
    value: String(item.id),
  }));
  const whatsappSelectList = await apiGetWhatsappSelectList();
  const whatsappItems = whatsappSelectList.data?.map((item) => ({
    key: item.id,
    label: formatPhoneNumber(item.number),
    value: item.id,
  }));
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="card h-full overflow-y-auto bg-base-100">
        <div className="card-body">
          <Typography as="h1" variant="h4" className="card-title mb-2">
            Edit Product Knowledge
          </Typography>
          <hr className="mb-4" />
          <FormProductKnowledge
            action="update"
            id={id}
            value={productKnowledge}
            customerServiceItems={customerServiceItems ?? []}
            whatsappItems={whatsappItems}
          />
        </div>
      </div>
    </>
  );
}
