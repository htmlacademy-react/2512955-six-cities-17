import { ValidationState } from '../types';
import { isValidValidationState } from '../utils';
import { Action } from './actions';

export function reducer<TStateValueType>(state: ValidationState<TStateValueType>, action: Action<TStateValueType>): ValidationState<TStateValueType> {
  switch(action.type) {
    case 'VALIDATE_CHECK': {
      return {
        ...state,
        isValid: isValidValidationState(state.validations),
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
    default: {
      return state;
    }
  }
}
