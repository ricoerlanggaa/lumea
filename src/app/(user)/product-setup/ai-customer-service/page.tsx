import { Button, Typography } from '@/components/atoms';
import { Breadcrumbs } from '@/components/molecules';
import { MetaIcon } from 'hugeicons-react';
import { getListCustomerService } from '@/actions/customer-service';
import { CardCustomerService, TableWhatsapp } from '@/components/templates';
import { getListWhatsapp } from '@/actions/whatsapp';

const breadcrumbsItems = [
  { key: 1, label: 'Product Setup' },
  { key: 2, label: 'AI Customer Service' },
];
export default async function AiCustomerService() {
  const { data: customerServices } = await getListCustomerService();
  const { data: whatsappList } = await getListWhatsapp();
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <Typography as="h1" variant="h4" className="card-title mb-2">
              Daftar CS AI
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
            <Button color="black" className="mr-auto mb-4">
              <MetaIcon className="mr-2" /> Hubungkan Nomor
            </Button>
            {whatsappList?.data && whatsappList?.data.length > 0 && (
              <TableWhatsapp items={whatsappList.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
