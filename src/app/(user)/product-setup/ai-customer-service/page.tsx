import { Breadcrumb } from '@/components/molecules';
import { Card } from '@/components/organism';
import { ButtonConnectWhatsapp, CardCustomerService, TableWhatsapp } from '@/components/templates';

const breadcrumbItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default async function AICustomerServicePage() {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        <Card title="AI Customer Service">
          <CardCustomerService />
        </Card>
        <Card title="Integrasi Nomor Whatsapp">
          <ButtonConnectWhatsapp />
          <TableWhatsapp />
        </Card>
      </div>
    </>
  );
}
