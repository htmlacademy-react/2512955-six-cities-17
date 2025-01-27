import { FieldValidationInfo, ValidationConfig, ValidationResults } from '../types';
import { isValidValidationState, validateAll, validateField } from '../utils';

type ValidationObject = {
  field: string;
  anotherField: number;
};

const FIELD_ERROR_MESSAGE = 'field is required';
const ANOTHER_FIELD_ERROR_MESSAGE = 'the value must be greater than 0';
const INFO_BY_VALID_FIELD: FieldValidationInfo = {
  isNotValid: false,
  message: ''
};

const schema: ValidationConfig<ValidationObject> = {
  field: [
    {
      rule: (value) => !!value,
      errorMessage: FIELD_ERROR_MESSAGE
    }
  ],
  anotherField: [
    {
      rule: (value) => value > 0,
      errorMessage: ANOTHER_FIELD_ERROR_MESSAGE
    }
  ]
};

describe('Validation functions', () => {
  describe('Function "validateField"', () => {
    it('should return correct info by valid field', () => {
      const validatingObject: ValidationObject = {
        anotherField: 4,
        field: 'correct field',
      };

      const result = validateField<ValidationObject>(validatingObject.field, 'field', schema);

      expect(result).toEqual(INFO_BY_VALID_FIELD);
    });

    it('should return correct info by not valid field', () => {
      const validatingObject: ValidationObject = {
        anotherField: -5,
        field: 'correct field',
      };
      const expectedValidationInfo: FieldValidationInfo = {
        isNotValid: true,
        message: ANOTHER_FIELD_ERROR_MESSAGE
      };

      const result = validateField<ValidationObject>(validatingObject.anotherField, 'anotherField', schema);

      expect(result).toEqual(expectedValidationInfo);
    });

    it('should return correct info by empty schema', () => {
      const validatingObject: ValidationObject = {
        anotherField: 4,
        field: 'correct field',
      };

      const result = validateField<ValidationObject>(validatingObject.field, 'field', {});

      expect(result).toEqual(INFO_BY_VALID_FIELD);
    });
  });

  describe('Function "validateAll"', () => {
    it('should return correct info by valid object', () => {
      const validatingObject: ValidationObject = {
        anotherField: 4,
        field: 'correct field',
      };
      const expectedValidationInfo: ValidationResults<ValidationObject> = {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD
      };

      const result = validateAll<ValidationObject>(validatingObject, schema);

      expect(result).toEqual(expectedValidationInfo);
    });

    it('should return correct info by not valid object', () => {
      const validatingObject: ValidationObject = {
        anotherField: 4,
        field: '',
      };
      const expectedValidationInfo: ValidationResults<ValidationObject> = {
        field: {
          isNotValid: true,
          message: FIELD_ERROR_MESSAGE
        },
        anotherField: INFO_BY_VALID_FIELD
      };

      const result = validateAll<ValidationObject>(validatingObject, schema);

      expect(result).toEqual(expectedValidationInfo);
    });

    it('should return empty info by empty object', () => {
      const result = validateAll({}, schema);

      expect(result).toEqual({});
    });

    it('should return correct info by empty schema', () => {
      const validatingObject: ValidationObject = {
        anotherField: 4,
        field: '',
      };

      const expectedValidationInfo: ValidationResults<ValidationObject> = {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD
      };

      const result = validateAll(validatingObject, {});

      expect(result).toEqual(expectedValidationInfo);
    });
  });

  describe('Function "isValidValidationState"', () => {
    it('should return "true" by valid state', () => {
      const expectedValidationState: ValidationResults<ValidationObject> = {
        field: INFO_BY_VALID_FIELD,
        anotherField: INFO_BY_VALID_FIELD,
      };

      const result = isValidValidationState<ValidationObject>(expectedValidationState, schema);

      expect(result).toBeTruthy();
    });

    it('should return "false" by valid state', () => {
      const expectedValidationState: ValidationResults<ValidationObject> = {
        field: INFO_BY_VALID_FIELD,
        anotherField: {
          isNotValid: true,
          message: ANOTHER_FIELD_ERROR_MESSAGE,
        },
      };

      const result = isValidValidationState<ValidationObject>(expectedValidationState, schema);

      expect(result).toBeFalsy();
    });

    it('should return "true" by empty state', () => {
      const expectedValidationState: ValidationResults<ValidationObject> = {};

      const result = isValidValidationState<ValidationObject>(expectedValidationState, schema);

      expect(result).toBeTruthy();
    });

    it('should return "true" by empty shema', () => {
      const expectedValidationState: ValidationResults<ValidationObject> = {
        field: INFO_BY_VALID_FIELD,
        anotherField: {
          isNotValid: true,
          message: ANOTHER_FIELD_ERROR_MESSAGE,
        },
      };
      const result = isValidValidationState<ValidationObject>(expectedValidationState, {});

      expect(result).toBeTruthy();
    });
  });
});
