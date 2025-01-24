import type { SelectHTMLAttributes } from 'react';
import type { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface SelectProps<T extends FieldValues>
  extends Partial<UseFormReturn<T>>,
    SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  inputKey?: Path<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}
