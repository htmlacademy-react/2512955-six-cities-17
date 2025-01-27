import { percentOfNumber } from '../percent-of-number';

describe('Function "percentOfNumber"', () => {
  it('shoutld return correct percent value', () => {
    const value = 3;
    const maxValue = 10;
    const expectedPercents = 30;

    const result = percentOfNumber(value, maxValue);

    expect(result).toBe(expectedPercents);
  });
});
