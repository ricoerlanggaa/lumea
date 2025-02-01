import { useId } from 'react';
import { classNames } from '@/utilities/formats/string';
import type { TextAreaProps } from '@/types/components/atoms';

export default function TextArea({
  label,
  placeholder,
  hasError,
  helperText,
  className,
  disabled,
  ...rest
}: TextAreaProps) {
  const textareaId = useId();
  const classes = classNames('textarea textarea-bordered', hasError && 'textarea-error', className);
  const helperTextClasses = classNames('label-text-alt', hasError && 'text-error');
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={textareaId} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        id={textareaId}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${textareaId}-helperText` : undefined}
        aria-disabled={disabled}
        {...rest}
      />
      {helperText && (
        <label htmlFor={textareaId} className="label py-[2px]">
          <span id={`${textareaId}-helperText`} className={helperTextClasses}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
}
