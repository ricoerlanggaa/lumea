import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { FormProductKnowledge } from '@/components/templates';
import { apiGetCustomerServiceSelectList, apiGetWhatsappSelectList } from '@/services';
import { formatPhoneNumber } from '@/utilities/formats/string';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'Product Knowledge', href: '/product-setup/product-knowledge' },
  { key: 3, label: 'Create' },
];
export default async function CreateProductKnowledge() {
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
            Product Knowledge
          </Typography>
          <hr className="mb-4" />
          <FormProductKnowledge
            customerServiceItems={customerServiceItems ?? []}
            whatsappItems={whatsappItems}
          />
        </div>
      </div>
    </>
  );
}
