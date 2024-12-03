import { FieldValidationInfo, ValidationResults } from '../types';

type ValidateCheckAction = {
  type: 'VALIDATE_CHECK';
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

export type Action<TObjectType> = ValidateCheckAction | ValidateFieldAction<TObjectType> | ValidateObjectAction<TObjectType>;
