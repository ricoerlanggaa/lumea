import type { TextareaHTMLAttributes } from 'react';
import type { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface TextAreaProps<T extends FieldValues>
  extends Partial<UseFormReturn<T>>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  inputKey: Path<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}
