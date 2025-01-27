import { act, renderHook } from '@testing-library/react';
import { FieldValidationInfo, ValidationConfig, ValidationState } from '../types';
import { useValidate } from '../use-validation';

type ValidationObject = {
  field: string;
  anotherField: number;
}

const ERROR_MESSAGE = 'error field';

const schema: ValidationConfig<ValidationObject> = {
  anotherField: [
    {
      rule: (value) => value > 0,
      errorMessage: ERROR_MESSAGE
    }
  ],
  field: [
    {
      rule: (value) => !!value,
      errorMessage: ERROR_MESSAGE
    }
  ]
};

const validFieldInfo: FieldValidationInfo = {
  isNotValid: false,
  message: ''
};

const notValidFieldInfo: FieldValidationInfo = {
  isNotValid: true,
  message: ERROR_MESSAGE
};

const expectedValidObject: ValidationObject = {
  anotherField: 9,
  field: 'test'
};

const expectedNotValidObject: ValidationObject = {
  anotherField: 0,
  field: 'test'
};

describe('Hook useValidate', () => {
  const isValidValidationStateMock = vi.fn();
  const validateFieldMock = vi.fn();
  const validateAllMock = vi.fn();

  beforeEach(() => {
    isValidValidationStateMock.mockReset();
    validateFieldMock.mockReset();
    validateAllMock.mockReset();
  });

  it('should return correct signature', () => {
    const functionType = 'function';
    const { result } = renderHook(() => useValidate(schema));
    const { current: {
      resetValidation,
      validateAll,
      validateField,
      validationResult
    }} = result;

    expect(typeof resetValidation).toBe(functionType);
    expect(typeof validateAll).toBe(functionType);
    expect(typeof validateField).toBe(functionType);
    expect(Object.keys(validationResult)).toEqual([
      'validations',
      'isValid'
    ]);
  });

  it('should correct works by \'resetValidation\' method', async () => {
    vi.spyOn(await import('../utils'), 'validateField')
      .mockImplementation(validateFieldMock.mockImplementation(() => validFieldInfo));
    vi.spyOn(await import('../utils'), 'isValidValidationState')
      .mockImplementation(isValidValidationStateMock.mockImplementation(() => true));
    vi.spyOn(await import('../utils'), 'validateAll')
      .mockImplementation(validateAllMock.mockImplementation(() => ({
        field: validFieldInfo,
        anotherField: validFieldInfo
      })));

    const { result } = renderHook(() => useValidate(schema));
    const { validationResult, resetValidation, validateAll } = result.current;

    act(() => validateAll(expectedValidObject));
    const {validationResult: newValidationResult} = result.current;
    act(() => resetValidation());
    const { validationResult: resettedValidationResult } = result.current;

    expect(validationResult).not.toEqual(newValidationResult);
    expect(resettedValidationResult).toEqual(validationResult);
  });

  it('should correct works by \'validateField\' method by valid field', async () => {
    const fieldName: keyof ValidationObject = 'field';
    const expectedValidationResult: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        field: validFieldInfo
      }
    };
    vi.spyOn(await import('../utils'), 'validateField')
      .mockImplementation(validateFieldMock.mockImplementation(() => validFieldInfo));
    vi.spyOn(await import('../utils'), 'isValidValidationState')
      .mockImplementation(isValidValidationStateMock.mockImplementation(() => true));

    const { result } = renderHook(() => useValidate(schema));
    const { validateField } = result.current;

    act(() => validateField(expectedNotValidObject[fieldName], fieldName));
    const {validationResult: newValidationResult} = result.current;

    expect(validateFieldMock.mock.lastCall).toEqual([
      expectedNotValidObject[fieldName],
      fieldName,
      schema
    ]);
    expect(isValidValidationStateMock).toBeCalledTimes(1);
    expect(expectedValidationResult).toEqual(newValidationResult);
  });

  it('should correct works by \'validateField\' method by not valid field', async () => {
    const fieldName: keyof ValidationObject = 'anotherField';
    const expectedValidationResult: ValidationState<ValidationObject> = {
      isValid: false,
      validations: {
        anotherField: notValidFieldInfo
      }
    };
    vi.spyOn(await import('../utils'), 'validateField')
      .mockImplementation(validateFieldMock.mockImplementation(() => notValidFieldInfo));
    vi.spyOn(await import('../utils'), 'isValidValidationState')
      .mockImplementation(isValidValidationStateMock.mockImplementation(() => false));

    const { result } = renderHook(() => useValidate(schema));
    const { validateField } = result.current;

    act(() => validateField(expectedNotValidObject[fieldName], fieldName));
    const {validationResult: newValidationResult} = result.current;

    expect(validateFieldMock.mock.lastCall).toEqual([
      expectedNotValidObject[fieldName],
      fieldName,
      schema
    ]);
    expect(isValidValidationStateMock).toBeCalledTimes(1);
    expect(expectedValidationResult).toEqual(newValidationResult);
  });

  it('should correct works by \'validateAll\' method by valid object', async () => {
    const expectedResults: ValidationState<ValidationObject> = {
      isValid: true,
      validations: {
        anotherField: validFieldInfo,
        field: validFieldInfo
      }
    };
    vi.spyOn(await import('../utils'), 'validateField')
      .mockImplementation(validateFieldMock.mockImplementation(() => validFieldInfo));
    vi.spyOn(await import('../utils'), 'isValidValidationState')
      .mockImplementation(isValidValidationStateMock.mockImplementation(() => true));
    vi.spyOn(await import('../utils'), 'validateAll')
      .mockImplementation(validateAllMock.mockImplementation(() => ({
        field: validFieldInfo,
        anotherField: validFieldInfo
      })));

    const { result } = renderHook(() => useValidate(schema));
    const { validationResult: initValidation, validateAll } = result.current;

    act(() => validateAll(expectedValidObject));

    const { validationResult } = result.current;

    expect(validateAllMock.mock.lastCall).toEqual([
      expectedValidObject,
      schema
    ]);
    expect(validateAllMock).toBeCalledTimes(1);
    expect(initValidation).not.toEqual(validationResult);
    expect(expectedResults).toEqual(validationResult);
  });
});
