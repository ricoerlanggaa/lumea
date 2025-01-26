'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Select, TextArea } from '@/components/atoms';
import type { SelectOption } from '@/types/components/atoms';
import type {
  FormProductKnowledgeProps,
  FormProductKnowledgeValues,
} from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import {
  apiCreateProductKnowledge,
  apiGetCustomerServiceSelectList,
  apiGetWhatsappSelectList,
  apiUpdateProductKnowledge,
} from '@/services';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { productKnowledgeSchema } from '@/utilities/validations/schema';

export default function FormProductKnowledge({
  action,
  value = { customerServiceId: 0, whatsappId: '', label: '', description: '' },
  itemId = 0,
}: FormProductKnowledgeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProductKnowledgeValues>({
    resolver: ajvResolver(productKnowledgeSchema),
    mode: 'onSubmit',
    defaultValues: value,
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [state, setState] = useState<FormProductKnowledgeValues>(value);
  const [loading, setLoading] = useState(false);
  const [customerServiceOptions, setCustomerServiceOptions] = useState<SelectOption[]>();
  const [whatsappOptions, setWhatsappOptions] = useState<SelectOption[]>();

  const onSubmit: SubmitHandler<FormProductKnowledgeValues> = async (data) => {
    setLoading(true);
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
    setLoading(false);
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
        inputKey="customerServiceId"
        register={register}
        errors={errors}
        options={customerServiceOptions}
        value={state.customerServiceId}
        onChange={(e) => setState({ ...state, customerServiceId: +e.target.value })}
      />
      <Select
        label="Nomor Whatsapp"
        placeholder="Pilih Nomor Whatsapp"
        inputKey="whatsappId"
        register={register}
        errors={errors}
        options={whatsappOptions}
        value={state.whatsappId}
        onChange={(e) => setState({ ...state, whatsappId: e.target.value })}
      />
      <TextArea
        inputKey="description"
        label="Product Knowledge"
        rows={5}
        register={register}
        errors={errors}
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
      />
      <Button type="submit" color="black" className="mt-2" disabled={loading} width="wide">
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
