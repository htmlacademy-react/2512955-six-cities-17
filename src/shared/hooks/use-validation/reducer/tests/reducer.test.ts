import { FieldValidationInfo, ValidationState } from '../../types';
import { reducer } from '../reducer';
import { INITIAL_STATE } from '../../consts';

type ValidationObject = {
  field: string;
  anotherField: number;
};

const FIELD_ERROR_MESSAGE = 'field is required';
const INFO_BY_VALID_FIELD: FieldValidationInfo = {
  isNotValid: false,
  message: ''
};

describe('Validation reducer', () => {
  it('should return correct state for "RESET_VALIDATION" action', () => {
    const expectedState: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD,
      }
    };

    const result = reducer(expectedState, { type: 'RESET_VALIDATION' });

    expect(result).toEqual(INITIAL_STATE);
  });

  it('should return correct state for "SET_IS_VALID" action', () => {
    const initState: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD,
      }
    };

    const expectedState: ValidationState<ValidationObject> = {
      ...initState,
      isValid: false,
    };

    const result = reducer(expectedState, { type: 'SET_IS_VALID', payload: false });

    expect(result).toEqual(expectedState);
  });

  it('should return correct state for "VALIDATE_FIELD" action', () => {
    const notValidFieldValidationInfo: FieldValidationInfo = {
      isNotValid: true,
      message: FIELD_ERROR_MESSAGE
    };

    const initState: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD
      }
    };

    const expectedState: ValidationState<ValidationObject> = {
      ...initState,
      validations: {
        field: notValidFieldValidationInfo
      }
    };

    const result = reducer(
      expectedState,
      {
        type: 'VALIDATE_FIELD',
        payload: {
          field: 'field',
          info: notValidFieldValidationInfo
        }
      });

    expect(result).toEqual(expectedState);
  });

  it('should return correct state for "VALIDATE_CHECK" action', () => {
    const notValidFieldValidationInfo: FieldValidationInfo = {
      isNotValid: true,
      message: FIELD_ERROR_MESSAGE
    };

    const initState: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD
      }
    };

    const expectedState: ValidationState<ValidationObject> = {
      ...initState,
      validations: {
        field: notValidFieldValidationInfo
      },
      isValid: false
    };

    const result = reducer(
      expectedState,
      {
        type: 'VALIDATE_FIELD',
        payload: {
          field: 'field',
          info: notValidFieldValidationInfo
        }
      });

    expect(result).toEqual(expectedState);
  });
});
