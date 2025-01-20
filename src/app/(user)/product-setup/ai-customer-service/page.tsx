import { Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { getCustomerServiceList } from '@/actions/customer-service';
import { ButtonConnectWhatsapp, CardCustomerService, TableWhatsapp } from '@/components/templates';
import { getWhatsappList } from '@/actions/whatsapp';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default async function AICustomerService() {
  const { data: customerServices } = await getCustomerServiceList();
  const { data: whatsappList } = await getWhatsappList();
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
            <CardCustomerService items={customerServices?.data ?? []} />
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Integrasi Nomor Whatsapp
            </Typography>
            <hr className="mb-4" />
            <ButtonConnectWhatsapp />
            {whatsappList?.data && whatsappList?.data.length > 0 && (
              <TableWhatsapp items={whatsappList.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
