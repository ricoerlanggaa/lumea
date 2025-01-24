import { useId } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { TextAreaProps } from '@/types/components/atoms';

export default function TextArea<T extends FieldValues>({
  label,
  placeholder,
  className,
  inputKey,
  disabled = false,
  register,
  errors,
  ...rest
}: TextAreaProps<T>) {
  const textareaId = useId();
  const errorMessages = errors
    ? (errors[inputKey as keyof typeof errors] as FieldError | undefined)
    : undefined;
  const hasError = !!(errors && errorMessages);
  const classes = classNames('textarea textarea-bordered', hasError && 'textarea-error', className);
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
        aria-describedby={hasError ? `${textareaId}-error` : undefined}
        aria-disabled={disabled}
        {...(register && inputKey && register(inputKey))}
        {...rest}
      />
      {hasError && (
        <label htmlFor={textareaId} className="label py-[2px]">
          <span id={`${textareaId}-error`} className="label-text-alt text-error">
            {errorMessages?.message}
          </span>
        </label>
      )}
    </div>
  );
}
