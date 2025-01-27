import { ALL_CITIES_NAMES, getCityName } from '../get-city-name';

describe('Function "getCityName"', () => {
  it('should return ALL_CITIES_NAME_ITEM', () => {
    const result = getCityName();

    expect(ALL_CITIES_NAMES.find((current) => current === result)).not.toBeUndefined();
  });
});
