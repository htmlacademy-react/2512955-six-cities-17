import { FieldValidationInfo, ValidationConfig, ValidationResults } from '../types';

type ValidateCheckAction<TObjectType> = {
  type: 'VALIDATE_CHECK';
  payload: ValidationConfig<TObjectType>;
};

type ValidateFieldAction<TObjectType> = {
  type: 'VALIDATE_FIELD';
  payload: {
    field: keyof TObjectType;
    info: FieldValidationInfo;
  };
};

type ValidateObjectAction<TObjectType> = {
  type: 'VALIDATE_OBJECT';
  payload: ValidationResults<TObjectType>;
}

type SetIsValidAction = {
  type: 'SET_IS_VALID';
  payload: boolean;
}

type ResetAction = {
  type: 'RESET_VALIDATION';
}

export type Action<TObjectType> = ResetAction | SetIsValidAction | ValidateCheckAction<TObjectType> | ValidateFieldAction<TObjectType> | ValidateObjectAction<TObjectType>;
