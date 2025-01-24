import { useCallback, useState } from 'react';
import type { FormState, UseFormReturn } from './types';

export function useForm<TObjectValue extends Record<string, unknown>>(initialValue: TObjectValue): UseFormReturn<TObjectValue, keyof TObjectValue> {
  const [formState, setFormState] = useState<FormState<TObjectValue>>({ values: initialValue, isSubmitting: false });

  const handleSubmit: UseFormReturn<TObjectValue, keyof TObjectValue>['handleSubmit'] = (onSubmit) =>
    async (event) => {
      event.preventDefault();
      setFormState((prev) => ({...prev, isSubmitting: true}));
      await onSubmit(formState.values);
      setFormState((prev) => ({...prev, isSubmitting: false}));
    };

  const getFieldValue: UseFormReturn<TObjectValue, keyof TObjectValue>['getFieldValue'] = (fieldName) => formState.values[fieldName];

  const setFieldValue: UseFormReturn<TObjectValue, keyof TObjectValue>['setFieldValue'] = (fieldName, value) => setFormState((prev) => {
    const { values } = prev;
    return {
      ...prev,
      values: {
        ...values,
        [fieldName]: value
      }
    };
  });

  const getFormValues = () => formState.values;

  const reset = () => {
    setFormState({ values: initialValue, isSubmitting: false });
  };

  const memizedGetFieldValue = useCallback(getFieldValue, [formState.values]);
  const memizedReset = useCallback(reset, [setFormState, initialValue]);
  const memizedSetFieldValue = useCallback(setFieldValue, [setFormState]);
  const memizedGetFormValues = useCallback(getFormValues, [formState.values]);

  return {
    getFieldValue: memizedGetFieldValue,
    handleSubmit,
    reset: memizedReset,
    setFieldValue: memizedSetFieldValue,
    getFormValues: memizedGetFormValues,
    isSubmitting: formState.isSubmitting
  };
}
