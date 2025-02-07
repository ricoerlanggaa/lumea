'use client';

import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import Ajv, { JSONSchemaType } from 'ajv';
import ajvErrors from 'ajv-errors';

type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isLoading: boolean;
  isSubmitted: boolean;
};

const ajv = new Ajv({ allErrors: true, strict: false, $data: true });
ajvErrors(ajv);

export default function useForm<T extends object>(
  schema: JSONSchemaType<T>,
  options?: { defaultValues?: T },
) {
  const defaultValues = useMemo(
    () => options?.defaultValues ?? ({} as T),
    [options?.defaultValues],
  );
  const [formState, setFormState] = useState<FormState<T>>({
    values: defaultValues,
    errors: {},
    isLoading: false,
    isSubmitted: false,
  });

  const validateForm = useCallback(() => {
    const validate = ajv.compile(schema);
    const valid = validate(formState.values);

    if (!valid && validate.errors) {
      const errors = validate.errors.reduce<Partial<Record<keyof T, string>>>(
        (acc, err) => {
          const field = (err.instancePath.slice(1) ||
            err.params?.errors?.[0].params.missingProperty ||
            err.params?.missingProperty) as keyof T;

          if (field && !acc[field]) {
            acc[field] = err.message || 'Invalid value';
          }
          return acc;
        },
        {} as Partial<Record<keyof T, string>>,
      );

      setFormState((prev) => ({ ...prev, errors }));
      return false;
    }

    setFormState((prev) => ({ ...prev, errors: {} }));
    return true;
  }, [formState.values, schema]);

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
    (name: keyof T) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target;
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
    // eslint-disable-next-line no-unused-vars
    (action: (data: T) => Promise<void> | void) => {
      return async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
