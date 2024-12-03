import { useReducer } from 'react';
import type { ValidationConfig, FieldValidationInfo, ValidationState, ValidationResults } from './types';
import { reducer } from './reducer';

type UseValidateReturn<TValueType, TKeys extends keyof TValueType = keyof TValueType> = {
  validateField: (fieldValue: TValueType[typeof field], field: TKeys) => void;
  validationResult: ValidationState<TValueType>;
  validateAll: (validateObject: TValueType) => void;
}

const INITAL_STATE: ValidationState<object> = {
  validations: {},
  isValid: false
};

export function useValidate<TValueType extends Record<string, unknown>, TKeys extends keyof TValueType = keyof TValueType>(validationScheme: ValidationConfig<TValueType>): UseValidateReturn<TValueType, TKeys> {
  const [validationStore, dispatch] = useReducer(reducer<TValueType>, INITAL_STATE);

  const validateField = (fieldValue: TValueType[typeof field], field: TKeys): FieldValidationInfo => {
    const validationRules = validationScheme[field] ?? [];
    const validationResults: FieldValidationInfo[] = validationRules.map((current) => {
      const isValid = current.rule(fieldValue);
      return {
        isNotValid: !isValid,
        message: isValid ? '' : current.errorMessage
      };
    }).filter((current) => current.isNotValid);

    return validationResults.length
      ? validationResults[0]
      : {
        isNotValid: false,
        message: ''
      };
  };

  const validateAll = (validationObject: TValueType) => {
    const validationResults: ValidationResults<TValueType> = Object.keys(validationObject)
      .reduce((accum, current) => {
        const typedKey = current as TKeys;
        return {
          ...accum,
          [typedKey]: validateField(validationObject[typedKey], typedKey)
        };
      }, {});

    dispatch({type: 'VALIDATE_OBJECT', payload: validationResults});
    dispatch({type: 'VALIDATE_CHECK'});
  };

  const writeFieldValidationIntoState = (fieldValue: TValueType[typeof field], field: TKeys): void => {
    dispatch({
      type: 'VALIDATE_FIELD',
      payload: {
        field,
        info: validateField(fieldValue, field)
      }
    });
    dispatch({type: 'VALIDATE_CHECK'});
  };

  return {
    validateField: writeFieldValidationIntoState,
    validateAll,
    validationResult: validationStore
  };
}
