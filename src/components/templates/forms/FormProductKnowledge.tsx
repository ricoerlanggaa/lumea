'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, TextArea } from '@/components/atoms';
import type { SelectOption } from '@/types/components/atoms';
import type {
  FormProductKnowledgeProps,
  FormProductKnowledgeValues,
} from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';
import { productKnowledgeSchema } from '@/utilities/validations/schema';
import {
  apiCreateProductKnowledge,
  apiGetCustomerServiceSelectList,
  apiGetWhatsappSelectList,
  apiUpdateProductKnowledge,
} from '@/services';

export default function FormProductKnowledge({
  action,
  value = { customerServiceId: 0, whatsappId: '', label: '', description: '' },
  itemId = 0,
}: FormProductKnowledgeProps) {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm(productKnowledgeSchema, { defaultValues: value });
  const router = useRouter();
  const { showToast } = useToast();

  const [customerServiceOptions, setCustomerServiceOptions] = useState<SelectOption[]>();
  const [whatsappOptions, setWhatsappOptions] = useState<SelectOption[]>();

  const onSubmit = async (data: FormProductKnowledgeValues) => {
    const response =
      action === 'update'
        ? await apiUpdateProductKnowledge({
            id: +itemId,
            cs_id: data.customerServiceId,
            number_id: data.whatsappId,
            label: data.label ?? '',
            description: data.description,
          })
        : await apiCreateProductKnowledge({
            cs_id: +data.customerServiceId,
            number_id: data.whatsappId,
            label: data.label ?? '',
            description: data.description,
          });
    if (response.status) {
      showToast({
        variant: 'success',
        message: `Product Knowledge berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
      });
      router.push('/product-setup/product-knowledge');
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };

  useEffect(() => {
    async function getCustomerServiceOptions() {
      const response = await apiGetCustomerServiceSelectList();
      if (response.data) {
        const options = response.data.map((item) => ({
          key: item.id,
          label: item.name,
          value: String(item.id),
        }));
        setCustomerServiceOptions(options);
      }
    }
    getCustomerServiceOptions();

    async function getWhatsappOptions() {
      const response = await apiGetWhatsappSelectList();
      if (response.data) {
        const options = response.data.map((item) => ({
          key: item.id,
          label: item.number,
          value: item.id,
        }));
        setWhatsappOptions(options);
      }
    }
    getWhatsappOptions();
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Customer Service"
        placeholder="Pilih Customer Service"
        options={customerServiceOptions}
        hasError={!!errors.customerServiceId}
        helperText={errors.customerServiceId}
        {...register('customerServiceId')}
      />
      <Select
        label="Nomor Whatsapp"
        placeholder="Pilih Nomor Whatsapp"
        options={whatsappOptions}
        hasError={!!errors.whatsappId}
        helperText={errors.whatsappId}
        {...register('whatsappId')}
      />
      <TextArea
        label="Product Knowledge"
        rows={5}
        hasError={!!errors.description}
        helperText={errors.description}
        {...register('description')}
      />
      <Button type="submit" color="black" className="mt-2" disabled={isLoading} shape="wide">
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
