import { getSearchParam } from '../get-search-param';

type TestSearchParams = {
  testId?: string;
}

describe('Functiion "getSearchParam"', () => {
  it('should return param value if value defined', () => {
    const paramsRecord: TestSearchParams = {
      testId: 'testValue'
    };
    const expectedSearchParams = new URLSearchParams(paramsRecord);

    const result = getSearchParam(expectedSearchParams, 'testId', '');

    expect(result).toBe(paramsRecord.testId);
  });

  it('should return default value if value not defined', () => {
    const paramsRecord = {};
    const defaultParamValue = 'default';
    const expectedSearchParams = new URLSearchParams(paramsRecord);

    const result = getSearchParam(expectedSearchParams, 'testId', defaultParamValue);

    expect(result).toBe(defaultParamValue);
  });
});
