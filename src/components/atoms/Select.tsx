import { useId } from 'react';
import { classNames } from '@/utilities/formats/string';
import type { SelectProps } from '@/types/components/atoms';

export default function Select({
  label,
  placeholder,
  options,
  className,
  hasError,
  helperText,
  disabled,
  value,
  ...rest
}: SelectProps) {
  const selectId = useId();
  const selectClasses = classNames('select select-bordered', hasError && 'select-error', className);
  const helperTextClasses = classNames('label-text-alt', hasError && 'text-error');
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
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${selectId}-helperText` : undefined}
        aria-disabled={disabled}
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
      {helperText && (
        <label htmlFor={selectId} className="label py-[2px]">
          <span id={`${selectId}-helperText`} className={helperTextClasses}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
}
