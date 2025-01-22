import { getDateDescription } from '../get-date-description';

type EachArg = {
  dateString: string;
  expectedValue: string;
}

describe('Function "getDateDescription"', () => {
  it.each<EachArg>([
    { dateString: '0001-01-01T00:00:00.000Z', expectedValue: 'January 1'},
    { dateString: '1994-10-27T21:00:00.056Z', expectedValue: 'October 1994'},
    { dateString: '2025-01-01T21:00:00.056Z', expectedValue: 'January 2025'},
    { dateString: '2025-12-31T23:59:59.999Z', expectedValue: 'December 2025'}
  ])('should return correct description by date', ({dateString, expectedValue}) => {
    const result = getDateDescription(Date.parse(dateString));
    expect(result).toBe(expectedValue);
  });
});
