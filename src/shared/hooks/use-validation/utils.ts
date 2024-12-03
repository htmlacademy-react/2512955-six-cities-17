import type { ValidationResults } from './types';

export function isValidValidationState<TValueType>(state: ValidationResults<TValueType>): boolean {
  const validations = Object.keys(state)
    .filter((current) => state[current as keyof ValidationResults<TValueType>]?.isNotValid
    );
  return validations.length === 0;
}
