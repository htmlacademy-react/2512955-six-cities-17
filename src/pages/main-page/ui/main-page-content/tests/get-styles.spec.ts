import { getPageStyles } from '../get-styles';

describe('Function "getPageStyles"', () => {
  it('should return correct styles by offers exists', () => {
    const expectedStyles: ReturnType<typeof getPageStyles> = {
      containerClassName: 'cities__places-container container',
      contentClassName: 'page__main--index'
    };

    const result = getPageStyles(true);

    expect(result).toEqual(expectedStyles);
  });

  it('should return correct styles by offers not exists', () => {
    const expectedStyles: ReturnType<typeof getPageStyles> = {
      containerClassName: 'cities__places-container cities__places-container--empty container',
      contentClassName: 'page__main--index page__main--index-empty'
    };

    const result = getPageStyles(false);

    expect(result).toEqual(expectedStyles);
  });
});
