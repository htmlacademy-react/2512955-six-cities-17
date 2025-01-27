import { BaseSyntheticEvent } from 'react';

export type FormState<TObjectType extends Record<string, unknown>> = {
  values: TObjectType;
  isSubmitting: boolean;
}

type OnSubmitCallbackType<TObjectType, TReturnType> = ((data: TObjectType) => Promise<TReturnType>) | ((data: TObjectType) => TReturnType);

type HandleSubmitReturn = (event?: BaseSyntheticEvent) => Promise<void>

export type UseFormReturn<TObjectType extends Record<string, unknown>, TKeys extends keyof TObjectType = keyof TObjectType> = {
  getFieldValue: <TKeyType extends TKeys>(fieldName: TKeyType) => TObjectType[TKeyType];
  setFieldValue: <TKeyType extends TKeys>(fieldName: TKeyType, value: TObjectType[TKeyType]) => void;
  handleSubmit: <TReturnType>(onSubmit: OnSubmitCallbackType<TObjectType, TReturnType>) => HandleSubmitReturn;
  reset: () => void;
  getFormValues: () => TObjectType;
  isSubmitting: boolean;
}
