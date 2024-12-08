import { useCallback, useReducer } from 'react';
import type { ValidationConfig, ValidationState, ValidationResults } from './types';
import { reducer } from './reducer';
import { validateField, validateAll, isValidValidationState } from './utils';
import { INITIAL_STATE } from './consts';

type UseValidateReturn<TValueType, TKeys extends keyof TValueType = keyof TValueType> = {
  validateField: (fieldValue: TValueType[typeof field], field: TKeys) => void;
  validationResult: ValidationState<TValueType>;
  validateAll: (validateObject: TValueType) => void;
  resetValidation: () => void;
}

export function useValidate<TValueType extends Record<string, unknown>, TKeys extends keyof TValueType = keyof TValueType>(validationScheme: ValidationConfig<TValueType>): UseValidateReturn<TValueType, TKeys> {
  const [validationStore, dispatch] = useReducer(reducer<TValueType>, INITIAL_STATE);

  const writeObjectValidationIntoState = (validationObject: TValueType) => {
    const validationResults: ValidationResults<TValueType> = validateAll(validationObject, validationScheme);
    const isValidState = isValidValidationState(validationResults, validationScheme);
    dispatch({type: 'VALIDATE_OBJECT', payload: validationResults});
    dispatch({type: 'SET_IS_VALID', payload: isValidState});
    return isValidState;
  };

  const writeFieldValidationIntoState = (fieldValue: TValueType[typeof field], field: TKeys): void => {
    dispatch({
      type: 'VALIDATE_FIELD',
      payload: {
        field,
        info: validateField(fieldValue, field, validationScheme)
      }
    });
    dispatch({type: 'VALIDATE_CHECK', payload: validationScheme});
  };

  const resetValidationResult = () => dispatch({type: 'RESET_VALIDATION'});

  const returnedValidateField = useCallback(
    writeFieldValidationIntoState,
    [validationScheme]
  );

  const returnedValidateAll = useCallback(
    writeObjectValidationIntoState,
    [validationScheme]
  );

  const resetValidation = useCallback(resetValidationResult, []);

  return {
    validateField: returnedValidateField,
    validateAll: returnedValidateAll,
    validationResult: validationStore,
    resetValidation
  };
}
