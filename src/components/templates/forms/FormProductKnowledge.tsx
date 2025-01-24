'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Select, TextArea } from '@/components/atoms';
import type { SelectOption } from '@/types/components/atoms';
import type {
  FormProductKnowledgeProps,
  FormProductKnowledgeValues,
} from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { productKnowledgeDescriptionValidation } from '@/utilities/validations/schema';
import {
  apiCreateProductKnowledge,
  apiGetCustomerServiceSelectList,
  apiGetWhatsappSelectList,
  apiUpdateProductKnowledge,
} from '@/services';

const productKnowledgeValidationSchema = yup.object().shape({
  customerServiceId: yup.number().required('Customer Service is required'),
  whatsappId: yup.string().required('Whatsapp Number is required'),
  description: productKnowledgeDescriptionValidation,
});

export default function FormProductKnowledge({
  action,
  value,
  itemId = 0,
}: FormProductKnowledgeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProductKnowledgeValues>({
    resolver: yupResolver(productKnowledgeValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [productKnowledge, setProductKnowledge] = useState<FormProductKnowledgeValues>({
    customerServiceId: value?.customerServiceId ?? 0,
    whatsappId: value?.whatsappId ?? '',
    description: value?.description ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [customerServiceOptions, setCustomerServiceOptions] = useState<SelectOption[]>();
  const [whatsappOptions, setWhatsappOptions] = useState<SelectOption[]>();

  const onSubmit: SubmitHandler<FormProductKnowledgeValues> = async (data) => {
    setLoading(true);
    const response =
      action === 'update'
        ? await apiUpdateProductKnowledge({
            id: itemId,
            cs_id: data.customerServiceId,
            number_id: data.whatsappId,
            label: data.label ?? '',
            description: data.description,
          })
        : await apiCreateProductKnowledge({
            cs_id: data.customerServiceId,
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
        label="AI Customer Service"
        placeholder="Pilih AI Customer Service"
        inputKey="customerServiceId"
        register={register}
        errors={errors}
        options={customerServiceOptions}
        value={productKnowledge.customerServiceId}
        onChange={(e) =>
          setProductKnowledge({ ...productKnowledge, customerServiceId: +e.target.value })
        }
      />
      <Select
        label="Nomor Whatsapp"
        placeholder="Pilih Nomor Whatsapp"
        inputKey="whatsappId"
        register={register}
        errors={errors}
        options={whatsappOptions}
        value={productKnowledge.whatsappId}
        onChange={(e) => setProductKnowledge({ ...productKnowledge, whatsappId: e.target.value })}
      />
      <TextArea
        inputKey="description"
        label="Product Knowledge"
        rows={5}
        register={register}
        errors={errors}
        value={productKnowledge.description}
        onChange={(e) => setProductKnowledge({ ...productKnowledge, description: e.target.value })}
      />
      <Button type="submit" color="black" className="mt-2" disabled={loading} width="wide">
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
