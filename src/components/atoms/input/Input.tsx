import { useId } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { InputProps } from './Input.d';

export default function Input<TInputValues extends FieldValues>({
  type = 'text',
  label,
  placeholder,
  prependIcon,
  appendIcon,
  className,
  inputKey,
  register,
  errors,
  ...rest
}: InputProps<TInputValues>) {
  const inputId = useId();
  const errorMessages = errors
    ? (errors[inputKey as keyof typeof errors] as FieldError | undefined)
    : undefined;
  const hasError = !!(errors && errorMessages);
  const classes = classNames(
    'input input-bordered flex items-center gap-2',
    hasError && 'input-error',
    className,
  );
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="text-xs md:text-sm leading-tight">{label}</span>
        </label>
      )}
      <label className={classes}>
        {prependIcon}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className="grow"
          {...(register && register(inputKey))}
          {...rest}
        />
        {appendIcon}
      </label>

      <label htmlFor={inputId} className="label py-[2px]">
        {hasError && <span className="label-text-alt text-error">{errorMessages?.message}</span>}
      </label>
    </div>
  );
}
