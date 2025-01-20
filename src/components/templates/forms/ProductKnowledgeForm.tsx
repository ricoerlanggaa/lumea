'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productKnowledgeDescriptionValidation } from '@/utilities/validations/schema';
import { Button, Select, TextArea } from '@/components/atoms';
import useToast from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { ProductKnowledgeItem } from '@/types/services';
import { apiCreateProductKnowledge, apiUpdateProductKnowledge } from '@/services';

const productKnowledgeValidationSchema = yup.object().shape({
  customerServiceId: yup.number().required('Customer Service is required'),
  whatsappId: yup.string().required('Whatsapp Number is required'),
  description: productKnowledgeDescriptionValidation,
});

export default function ProductKnowledgeForm({
  action,
  value,
  id = 0,
  customerServiceItems,
  whatsappItems,
}: {
  action?: 'create' | 'update';
  id?: number;
  value?: ProductKnowledgeItem;
  customerServiceItems?: { key: string; label: string; value: string }[];
  whatsappItems?: { key: string; label: string; value: string }[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductKnowledgeItem>({
    resolver: yupResolver(productKnowledgeValidationSchema),
  });
  const [productKnowledge, setProductKnowledge] = useState<ProductKnowledgeItem>({
    customerServiceId: value?.customerServiceId ?? 0,
    whatsappId: value?.whatsappId ?? '',
    description: value?.description ?? '',
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<ProductKnowledgeItem> = async (data) => {
    setLoading(true);
    const response =
      action === 'update'
        ? await apiUpdateProductKnowledge({ ...data, id })
        : await apiCreateProductKnowledge(data);
    if (response.status) {
      showToast({
        variant: 'success',
        message: `Product Knowledge berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
        placement: 'bottom-center',
      });
      router.push('/product-setup/product-knowledge');
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
        placement: 'bottom-center',
      });
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="AI Customer Service"
        placeholder="Pilih AI Customer Service"
        inputKey="customerServiceId"
        register={register}
        errors={errors}
        items={customerServiceItems}
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
        items={whatsappItems}
        value={productKnowledge.whatsappId}
        onChange={(e) => setProductKnowledge({ ...productKnowledge, whatsappId: e.target.value })}
      />
      <TextArea
        inputKey="description"
        label="Product Knowledge"
        className="h-32"
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
ProductKnowledgeForm.defaultProps = {
  action: 'create',
  value: {},
  id: 0,
  customerServiceItems: [],
  whatsappItems: [],
};
