import { Typography } from '@/components/atoms';
import { Breadcrumb } from '@/components/molecules';
import { ButtonConnectWhatsapp, CardCustomerService, TableWhatsapp } from '@/components/templates';
import type { TableWhatsappItem } from '@/types/components/templates';
import { apiGetWhatsappList } from '@/services';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default async function AICustomerServicePage() {
  const whatsappList = await apiGetWhatsappList();
  const whatsappItems: TableWhatsappItem[] = whatsappList.data.map((item) => ({
    id: item.id,
    number: item.number,
    status: item.isConnected ? 'connected' : 'disconnected',
  }));
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              AI Customer Service
            </Typography>
            <hr className="mb-4" />
            <CardCustomerService />
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Integrasi Nomor Whatsapp
            </Typography>
            <hr className="mb-4" />
            <ButtonConnectWhatsapp />
            <TableWhatsapp items={whatsappItems} />
          </div>
        </div>
      </div>
    </>
  );
}
