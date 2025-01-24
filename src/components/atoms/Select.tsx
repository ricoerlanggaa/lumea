import { useId } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { SelectProps } from '@/types/components/atoms';

export default function Select<T extends FieldValues>({
  label,
  placeholder,
  options,
  className,
  inputKey,
  value,
  register,
  errors,
  ...rest
}: SelectProps<T>) {
  const selectId = useId();
  const errorMessages = errors
    ? (errors[inputKey as keyof typeof errors] as FieldError | undefined)
    : undefined;
  const hasError = !!(errors && errorMessages);
  const selectClasses = classNames('select select-bordered', hasError && 'select-error', className);
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={selectId} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        id={selectId}
        className={selectClasses}
        value={value || ''}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${selectId}-error` : undefined}
        {...(register && inputKey && register(inputKey))}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {hasError && (
        <label htmlFor={selectId} className="label py-[2px]">
          <span id={`${selectId}-error`} className="label-text-alt text-error">
            {errorMessages?.message}
          </span>
        </label>
      )}
    </div>
  );
}
