import { useId } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { SelectProps } from '@/types/components/atoms';

export default function Select<TSelectValues extends FieldValues>({
  label,
  placeholder = 'Select Option',
  items,
  className,
  inputKey,
  value,
  register,
  errors,
  ...rest
}: SelectProps<TSelectValues>) {
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
        {...(register && register(inputKey))}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items &&
          items.map((item) => (
            <option key={item.key} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      <label htmlFor={selectId} className="label">
        {hasError && <span className="label-text-alt text-error">{errorMessages?.message}</span>}
      </label>
    </div>
  );
}
