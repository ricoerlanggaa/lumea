import { Typography } from '@/components/atoms';
import { FormProductKnowledge } from '@/components/templates';

export default function ProductKnowledge() {
  return (
    <div className="card h-full overflow-y-auto bg-base-100">
      <div className="card-body">
        <Typography as="h1" variant="h3" weight="bold" className="card-title">
          Product Knowledge
        </Typography>
        <div className="divider my-1" />
        <FormProductKnowledge />
      </div>
    </div>
  );
}
