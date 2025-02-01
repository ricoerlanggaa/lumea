import { useId } from 'react';
import { classNames } from '@/utilities/formats/string';
import type { InputProps } from '@/types/components/atoms';

export default function Input({
  type = 'text',
  label,
  placeholder,
  prefix,
  suffix,
  className,
  hasError,
  helperText,
  disabled,
  ...rest
}: InputProps) {
  const inputId = useId();
  const inputClasses = classNames(
    'input input-bordered flex items-center gap-2',
    hasError && 'input-error',
    className,
  );
  const helperTextClasses = classNames('label-text-alt', hasError && 'text-error');
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="text-xs md:text-sm leading-tight">{label}</span>
        </label>
      )}
      <label className={inputClasses}>
        {prefix}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className="grow"
          aria-invalid={hasError}
          aria-describedby={helperText ? `${inputId}-helperText` : undefined}
          aria-disabled={disabled}
          {...rest}
        />
        {suffix}
      </label>
      {helperText && (
        <label htmlFor={inputId} className="label py-[2px]">
          <span id={`${inputId}-helperText`} className={helperTextClasses}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
}
