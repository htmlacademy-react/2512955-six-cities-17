import type { FieldValidationInfo, ValidationConfig, ValidationResults } from './types';

export function isValidValidationState<TValueType>(state: ValidationResults<TValueType>, schema: ValidationConfig<TValueType>): boolean {
  const schemaKeys = Object.keys(schema);
  const stateKeys = Object.keys(state);
  return schemaKeys.every((current) => {
    const typedCurrentKey = current as keyof ValidationResults<TValueType>;
    return !!stateKeys.find((key) => key === current) && !state[typedCurrentKey]?.isNotValid;
  });
}

export function validateField<TValueType>(fieldValue: TValueType[typeof field], field: keyof TValueType, schema: ValidationConfig<TValueType>): FieldValidationInfo {
  const validationRules = schema[field] ?? [];
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
}

export function validateAll<TValueType extends Record<string, unknown>, TKeys extends keyof TValueType = keyof TValueType>(validationObject: TValueType, schema: ValidationConfig<TValueType>) {
  return Object.keys(validationObject)
    .reduce((accum, current) => {
      const typedKey = current as TKeys;
      return {
        ...accum,
        [typedKey]: validateField(validationObject[typedKey], typedKey, schema)
      };
    }, {});
}
