import classNames from 'classnames';
import type { OfferCardStyles, ViewType } from './types';

export const getOfferCardStyles = (viewType: ViewType, isFavoriteOffer: boolean): OfferCardStyles => {
  const isMainViewMode = viewType === 'main';
  return {
    containerClassName: classNames(
      {
        'cities__card': isMainViewMode,
        'favorites__card': !isMainViewMode
      },
      'place-card'
    ),
    imageWrapperClassName: classNames(
      {
        'cities__image-wrapper': isMainViewMode,
        'favorites__image-wrapper': !isMainViewMode
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
        'favorites__card-info': !isMainViewMode
      },
      'place-card__info'
    )
  };
};
