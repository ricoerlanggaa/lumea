import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { Button, Typography } from '@/components/atoms';
import { FormCSAI } from '@/components/templates';

export default function AddAICustomerService() {
  return (
    <div className="card h-full overflow-y-auto bg-base-100">
      <div className="card-body">
        <div className="card-title">
          <Button
            href="/product-setup/ai-customer-service"
            variant="ghost"
            size="sm"
            className="btn-square"
          >
            <Icon path={mdiArrowLeft} size={1} className="text-base-content" />
          </Button>
          <Typography as="h1" variant="h3" weight="bold">
            Customer Service Setup
          </Typography>
        </div>
        <div className="divider my-1" />
        <FormCSAI />
      </div>
    </div>
  );
}
