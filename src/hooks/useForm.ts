'use client';

import { useCallback, useMemo, useState } from 'react';
import type {
  UseFormChangeEvent,
  UseFormError,
  UseFormSchema,
  UseFormState,
  UseFormSubmitAction,
  UseFormSubmitEvent,
} from '@/types/hooks/useForm';
import { Validator } from '@/utilities/validations';

export default function useForm<T extends object>(
  schema: UseFormSchema<T>,
  options?: { defaultValues?: T },
) {
  const defaultValues = useMemo(
    () => options?.defaultValues ?? ({} as T),
    [options?.defaultValues],
  );
  const [formState, setFormState] = useState<UseFormState<T>>({
    values: defaultValues,
    errors: {},
    isLoading: false,
    isSubmitted: false,
  });

  const validator = useMemo(() => new Validator<T>(schema), [schema]);

  const validateForm = useCallback(() => {
    const result = validator.validate(formState.values);

    if (!result.valid) {
      const errors = result.errors?.reduce<UseFormError<T>>((acc, err) => {
        const field = (err.instancePath.slice(1) ||
          err.params?.errors?.[0].params.missingProperty ||
          err.params?.missingProperty) as keyof T;
        if (field && !acc[field]) {
          acc[field] = err.message || 'Invalid value';
        }
        return acc;
      }, {} as UseFormError<T>);
      setFormState((prev) => ({ ...prev, errors: errors || {} }));
      return false;
    }

    setFormState((prev) => ({ ...prev, errors: {} }));
    return true;
  }, [formState.values, validator]);

  const setValues = useCallback((value: T) => {
    setFormState((prev) => ({ ...prev, values: value }));
  }, []);

  const resetValues = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      values: Object.fromEntries(
        Object.entries(defaultValues).map(([key, value]) => {
          if (typeof value === 'number') return [key, 0];
          return [key, ''];
        }),
      ) as T,
    }));
  }, [defaultValues]);

  const handleChange = useCallback(
    (name: keyof T) => (event: UseFormChangeEvent) => {
      const { value } = event.target;
      setFormState((prev) => {
        const updatedValues = { ...prev.values, [name]: value };
        return { ...prev, values: updatedValues };
      });
      if (formState.isSubmitted) {
        validateForm();
      }
    },
    [formState.isSubmitted, validateForm],
  );

  const register = useMemo(
    () => (name: keyof T) => ({
      name,
      value: formState.values[name] ?? '',
      onChange: handleChange(name),
    }),
    [handleChange, formState.values],
  );

  const submitHandler = useCallback(
    (action: UseFormSubmitAction<T>) => {
      return async (event: UseFormSubmitEvent) => {
        event.preventDefault();
        setFormState((prev) => ({ ...prev, isSubmitted: true }));
        try {
          setFormState((prev) => ({ ...prev, isLoading: true }));
          const isValid = validateForm();
          if (isValid) {
            await action(formState.values);
            return true;
          }
          return false;
        } finally {
          setFormState((prev) => ({ ...prev, isLoading: false }));
        }
      };
    },
    [formState.values, validateForm],
  );

  return { register, formState, setValues, resetValues, submitHandler };
}
