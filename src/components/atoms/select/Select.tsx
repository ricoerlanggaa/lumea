import { useId } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { SelectProps } from './Select.d';

export default function Select<TInputValues extends FieldValues>({
  label,
  items,
  className,
  inputKey,
  register,
  errors,
  ...rest
}: SelectProps<TInputValues>) {
  const selectId = useId();
  const errorMessages = errors
    ? (errors[inputKey as keyof typeof errors] as FieldError | undefined)
    : undefined;
  const hasError = !!(errors && errorMessages);
  const classes = classNames('select select-bordered', hasError && 'select-error', className);
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={selectId} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select id={selectId} className={classes} {...(register && register(inputKey))} {...rest}>
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
