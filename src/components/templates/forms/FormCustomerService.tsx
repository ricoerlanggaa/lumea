'use client';

import { useRouter } from 'next/navigation';
import { Button, Input, TextArea } from '@/components/atoms';
import type {
  FormCustomerServiceProps,
  FormCustomerServiceValues,
} from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';
import { customerServiceSchema } from '@/utilities/validations/schema';
import { apiCreateCustomerService, apiUpdateCustomerService } from '@/services';

export default function FormCustomerService({
  itemId = 0,
  value = { name: '', label: '', personality: '' },
  action,
}: FormCustomerServiceProps) {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm(customerServiceSchema, {
    defaultValues: value,
  });
  const router = useRouter();
  const { showToast } = useToast();

  const onSubmit = async (data: FormCustomerServiceValues) => {
    const response =
      action === 'update'
        ? await apiUpdateCustomerService({ ...data, id: +itemId })
        : await apiCreateCustomerService(data);
    if (response.status) {
      showToast({
        variant: 'success',
        message: `AI Customer Service berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
      });
      router.push('/product-setup/ai-customer-service');
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nama"
        placeholder="Masukkan Nama Customer Service Anda"
        hasError={!!errors.name}
        helperText={errors.name}
        {...register('name')}
      />
      <Input
        label="Label (Opsional)"
        placeholder="Masukkan Label Customer Service Anda"
        hasError={!!errors.label}
        helperText={errors.label}
        {...register('label')}
      />
      <TextArea
        label="Personality"
        placeholder="Masukkan Personality Customer Service Anda"
        rows={5}
        hasError={!!errors.personality}
        helperText={errors.personality}
        {...register('personality')}
      />
      <Button type="submit" color="black" shape="wide" className="mt-2" disabled={isLoading}>
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
