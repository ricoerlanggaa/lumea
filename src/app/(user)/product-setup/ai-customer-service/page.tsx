import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { ButtonConnectWhatsapp, CardCustomerService, TableWhatsapp } from '@/components/templates';
import { apiGetCustomerServiceList, apiGetWhatsappList } from '@/services';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default async function AICustomerService() {
  const { data: customerServices } = await apiGetCustomerServiceList();
  const { data: whatsappList } = await apiGetWhatsappList();
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              AI Customer Service
            </Typography>
            <hr className="mb-4" />
            <CardCustomerService items={customerServices ?? []} />
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Integrasi Nomor Whatsapp
            </Typography>
            <hr className="mb-4" />
            <ButtonConnectWhatsapp />
            <TableWhatsapp items={whatsappList ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}
