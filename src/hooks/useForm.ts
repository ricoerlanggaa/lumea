import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import Ajv, { JSONSchemaType } from 'ajv';
import ajvErrors from 'ajv-errors';

type FormState<T> = {
  errors: Partial<Record<keyof T, string>>;
  isLoading: boolean;
};

const ajv = new Ajv({ allErrors: true, $data: true });
ajvErrors(ajv);

export default function useForm<T extends object>(
  schema: JSONSchemaType<T>,
  options?: { defaultValues?: T },
) {
  const defaultValues = options?.defaultValues ?? ({} as T);
  const formDataRef = useRef<T>(defaultValues);
  const [formState, setFormState] = useState<FormState<T>>({
    errors: {},
    isLoading: false,
  });
  const validate = useRef(ajv.compile(schema));

  const validateForm = useCallback(() => {
    const isValid = validate.current(formDataRef.current);

    if (!isValid) {
      const errors = validate.current.errors?.reduce<Partial<Record<keyof T, string>>>(
        (acc, err) => {
          const field = err.instancePath.slice(1) as keyof T;
          if (!acc[field]) {
            acc[field] = err.message || 'Invalid value';
          }
          return acc;
        },
        {} as Partial<Record<keyof T, string>>,
      );

      setFormState((prev) => ({ ...prev, errors: errors || {} }));
      return false;
    }

    setFormState((prev) => ({ ...prev, errors: {} }));
    return true;
  }, []);

  const handleChange = useCallback(
    (name: keyof T) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        formDataRef.current = { ...formDataRef.current, [name]: e.target.value };
        validateForm();
      },
    [validateForm],
  );

  const register = useMemo(
    () => (name: keyof T) => ({
      name,
      value: formDataRef.current[name] ?? '',
      onChange: handleChange(name),
    }),
    [handleChange],
  );

  const handleSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    (action: (data: T) => Promise<void> | void) => {
      return async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          setFormState((prev) => ({ ...prev, isLoading: true }));
          if (validateForm()) {
            await action(formDataRef.current);
            return true;
          }
          return false;
        } finally {
          setFormState((prev) => ({ ...prev, isLoading: false }));
        }
      };
    },
    [validateForm],
  );

  return { register, formState, handleSubmit };
}
