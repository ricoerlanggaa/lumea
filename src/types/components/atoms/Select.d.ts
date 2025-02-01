import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  hasError?: boolean;
  helperText?: string;
}
