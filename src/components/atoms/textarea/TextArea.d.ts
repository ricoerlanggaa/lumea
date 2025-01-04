import { TextareaHTMLAttributes } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface TextAreaProps<TInputValues extends FieldValues>
  extends Partial<UseFormReturn<TInputValues>>,
    TextareaHTMLAttributes<HTMLElement> {
  label?: string;
  inputKey: Path<TInputValues>;
  errors?: Partial<DeepMap<TInputValues, FieldError>>;
}
