import classNames from 'classnames';
import type { OfferCardStyles, ViewType } from './types';
import { ElementSize } from '@shared/types';
import { DEFAULT_IMAGE_SIZE_FAVORITES, DEFAULT_IMAGE_SIZE_MAIN } from './consts';

export const getOfferCardStyles = (viewType: ViewType, isFavoriteOffer: boolean): OfferCardStyles => ({
  containerClassName: classNames(
    {
      'cities__card': viewType === 'main',
      'favorites__card': viewType === 'favorites',
      'near-places__card': viewType === 'near'
    },
    'place-card'
  ),
  imageWrapperClassName: classNames(
    {
      'cities__image-wrapper': viewType === 'main',
      'favorites__image-wrapper': viewType === 'favorites',
      'near-places__image-wrapper': viewType === 'near'
    },
    'place-card__image-wrapper'
  ),
  bookmarkButtonClassName: classNames(
    'place-card__bookmark-button',
    {
      'place-card__bookmark-button--active': isFavoriteOffer
    },
    'button'
  ),
  cardInfoContainerClassName: classNames(
    {
      'favorites__card-info': viewType === 'favorites'
    },
    'place-card__info'
  )
});

export const getImageSizeByViewType = (viewType: ViewType): ElementSize => {
  switch(viewType) {
    case 'favorites':
      return DEFAULT_IMAGE_SIZE_FAVORITES;
    default:
      return DEFAULT_IMAGE_SIZE_MAIN;
  }
};
