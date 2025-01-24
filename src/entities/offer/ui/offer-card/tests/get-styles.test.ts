import { ElementSize } from '@shared/types';
import { DEFAULT_IMAGE_SIZE_FAVORITES, DEFAULT_IMAGE_SIZE_MAIN } from '../consts';
import { getImageSizeByViewType, getOfferCardStyles } from '../get-styles';
import { ViewType } from '../types';

type GetImageSizeTestsEachParams = {
  type: ViewType;
  expectedSize: ElementSize;
}

describe('Offer card styles functions', () => {
  describe('Function "getImageSizeByViewType"', () => {
    it.each<GetImageSizeTestsEachParams>([
      { type: 'main', expectedSize: DEFAULT_IMAGE_SIZE_MAIN },
      { type: 'favorites', expectedSize: DEFAULT_IMAGE_SIZE_FAVORITES },
      { type: 'near', expectedSize: DEFAULT_IMAGE_SIZE_MAIN }
    ])('should return correct ElementSize by supported view type', ({type, expectedSize}) => {
      const result = getImageSizeByViewType(type);

      expect(result).toEqual(expectedSize);
    });
  });

  describe('Function "getOfferCardStyles"', () => {
    describe('should return correct styles', () => {
      it('with main view type and favorite offer', () => {
        const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
          containerClassName: 'cities__card place-card',
          imageWrapperClassName: 'cities__image-wrapper place-card__image-wrapper',
          bookmarkButtonClassName: 'place-card__bookmark-button place-card__bookmark-button--active button',
          cardInfoContainerClassName: 'place-card__info'
        };

        const result = getOfferCardStyles('main', true);

        expect(result).toEqual(expectedStyles);
      });

      it('with main view type and not favorite offer', () => {
        const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
          containerClassName: 'cities__card place-card',
          imageWrapperClassName: 'cities__image-wrapper place-card__image-wrapper',
          bookmarkButtonClassName: 'place-card__bookmark-button button',
          cardInfoContainerClassName: 'place-card__info'
        };

        const result = getOfferCardStyles('main', false);

        expect(result).toEqual(expectedStyles);
      });

      it('with favorites view type and favorite offer', () => {
        const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
          containerClassName: 'favorites__card place-card',
          imageWrapperClassName: 'favorites__image-wrapper place-card__image-wrapper',
          bookmarkButtonClassName: 'place-card__bookmark-button place-card__bookmark-button--active button',
          cardInfoContainerClassName: 'favorites__card-info place-card__info'
        };

        const result = getOfferCardStyles('favorites', true);

        expect(result).toEqual(expectedStyles);
      });

      it('with favorites view type and not favorite offer', () => {
        const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
          containerClassName: 'favorites__card place-card',
          imageWrapperClassName: 'favorites__image-wrapper place-card__image-wrapper',
          bookmarkButtonClassName: 'place-card__bookmark-button button',
          cardInfoContainerClassName: 'favorites__card-info place-card__info'
        };

        const result = getOfferCardStyles('favorites', false);

        expect(result).toEqual(expectedStyles);
      });
    });

    it('with near view type and favorite offer', () => {
      const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
        containerClassName: 'near-places__card place-card',
        imageWrapperClassName: 'near-places__image-wrapper place-card__image-wrapper',
        bookmarkButtonClassName: 'place-card__bookmark-button place-card__bookmark-button--active button',
        cardInfoContainerClassName: 'place-card__info'
      };

      const result = getOfferCardStyles('near', true);

      expect(result).toEqual(expectedStyles);
    });

    it('with near view type and not favorite offer', () => {
      const expectedStyles: ReturnType<typeof getOfferCardStyles> = {
        containerClassName: 'near-places__card place-card',
        imageWrapperClassName: 'near-places__image-wrapper place-card__image-wrapper',
        bookmarkButtonClassName: 'place-card__bookmark-button button',
        cardInfoContainerClassName: 'place-card__info'
      };

      const result = getOfferCardStyles('near', false);

      expect(result).toEqual(expectedStyles);
    });
  });
});
