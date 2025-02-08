/* eslint-disable no-unused-vars */
import { JSONSchemaType } from 'ajv';
import { ChangeEvent, FormEvent } from 'react';

export type UseFormError<T> = Partial<Record<keyof T, string>>;
export type UseFormState<T> = {
  values: T;
  errors: UseFormError<T>;
  isLoading: boolean;
  isSubmitted: boolean;
};
export type UseFormSchema<T> = JSONSchemaType<T>;

export type UseFormSubmitAction<T> = (data: T) => Promise<void> | void;

export type UseFormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type UseFormSubmitEvent = FormEvent<HTMLFormElement>;
