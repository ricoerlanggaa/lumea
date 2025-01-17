import { Typography } from '@/components/atoms';
import { FormCSAI } from '@/components/templates';

export default function AddAICustomerService() {
  return (
    <div className="card h-full overflow-y-auto bg-base-100">
      <div className="card-body">
        <Typography as="h1" variant="h3" className="card-title">
          Customer Service Setup
        </Typography>
        <div className="divider my-1" />
        <FormCSAI />
      </div>
    </div>
  );
}
