import { Nullable } from '@shared/types';

export type FieldValidationInfo = {
  isNotValid: boolean;
  message: Nullable<string>;
};

export type ValidateFunction<TValueType> = (value: TValueType) => boolean;

export type ValidationResults<TValueType> = Partial<{
  [key in keyof TValueType]: FieldValidationInfo;
}>

export type ValidationState<TValueType> = {
  validations: ValidationResults<TValueType>;
  isValid: boolean;
};

type ValidationConfigRule<TValueType> = {
  rule: ValidateFunction<TValueType>;
  errorMessage: string;
}

export type ValidationConfig<TValueType> = Partial<{
  [key in keyof TValueType]: Array<ValidationConfigRule<TValueType[key]>>
}>

