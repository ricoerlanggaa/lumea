import { useId } from 'react';
import { FieldError, FieldValues } from 'react-hook-form';
import { classNames } from '@/utilities/formats/string';
import type { TextAreaProps } from './TextArea.d';

export default function TextArea<TInputValues extends FieldValues>({
  label,
  placeholder,
  className,
  inputKey,
  register,
  errors,
  ...rest
}: TextAreaProps<TInputValues>) {
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
        {...(register && register(inputKey))}
        {...rest}
      />
      <label htmlFor={textareaId} className="label">
        {hasError && <span className="label-text-alt text-error">{errorMessages?.message}</span>}
      </label>
    </div>
  );
}
