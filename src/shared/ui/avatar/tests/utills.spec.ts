import { getAvatarStyles } from '../utils';

describe('Function "getAvatarStyles"', () => {
  describe('return correct styles by "offer" avatar type', () => {
    it('styles for isPro = true', () => {
      const expectedStyles: ReturnType<typeof getAvatarStyles> = {
        wrapperStyles: 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper',
        imgStyles: 'offer__avatar user__avatar',
        spanStyles: 'offer__user-name'
      };

      const result = getAvatarStyles(true, 'offer');

      expect(result).toEqual(expectedStyles);
    });

    it('styles for isPro = false', () => {
      const expectedStyles: ReturnType<typeof getAvatarStyles> = {
        wrapperStyles: 'offer__avatar-wrapper user__avatar-wrapper',
        imgStyles: 'offer__avatar user__avatar',
        spanStyles: 'offer__user-name'
      };

      const result = getAvatarStyles(false, 'offer');

      expect(result).toEqual(expectedStyles);
    });
  });

  describe('return correct styles by "review" avatar type', () => {
    const expectedStyles: ReturnType<typeof getAvatarStyles> = {
      wrapperStyles: 'reviews__avatar-wrapper user__avatar-wrapper',
      imgStyles: 'reviews__avatar user__avatar',
      spanStyles: 'reviews__user-name'
    };

    it('styles for isPro = true', () => {
      const result = getAvatarStyles(true, 'review');

      expect(result).toEqual(expectedStyles);
    });

    it('styles for isPro = false', () => {
      const result = getAvatarStyles(false, 'review');

      expect(result).toEqual(expectedStyles);
    });
  });
});
