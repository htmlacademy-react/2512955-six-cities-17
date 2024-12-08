import { INITIAL_STATE } from '../consts';
import { ValidationState } from '../types';
import { isValidValidationState } from '../utils';
import { Action } from './actions';

export function reducer<TStateValueType>(state: ValidationState<TStateValueType>, action: Action<TStateValueType>): ValidationState<TStateValueType> {
  switch(action.type) {
    case 'VALIDATE_CHECK': {
      return {
        ...state,
        isValid: isValidValidationState(state.validations, action.payload),
      };
    }
    case 'VALIDATE_FIELD': {
      const { field, info } = action.payload;
      return {
        ...state,
        validations: {
          ...state.validations,
          [field]: info
        },
      };
    }
    case 'VALIDATE_OBJECT': {
      return {
        ...state,
        validations: action.payload
      };
    }
    case 'SET_IS_VALID': {
      return {
        ...state,
        isValid: action.payload
      };
    }
    case 'RESET_VALIDATION': {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}
