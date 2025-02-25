import type { Classed, ElementSize } from '@shared/types';
import PremiumMark from '@shared/ui/premium-mark';
import RatingInStars from '@shared/ui/rating-in-stars';
import classNames from 'classnames';
import type { MainOfferInfo } from '../../model/types';
import { getOfferCardStyles, getImageSizeByViewType } from './get-styles';
import type { ViewType } from './types';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';
import { Link } from 'react-router-dom';
import FavoritesButton from '@shared/ui/favorites-button';

type OfferCardProps = Classed<{
  offer: MainOfferInfo;
  viewType?: ViewType;
  onFavoritesButtonClick?: (offerId: string, isFavorite: boolean) => void;
  onActivateOffer?: (offerId: string) => void;
}>;

const FAVORITES_BUTTON_SIZE: ElementSize = {
  height: 19,
  width: 18,
};

export function OfferCard({ offer, className, onActivateOffer, viewType = 'main', onFavoritesButtonClick }: OfferCardProps): JSX.Element {
  const {
    bookmarkButtonClassName,
    cardInfoContainerClassName,
    containerClassName,
    imageWrapperClassName
  } = getOfferCardStyles(viewType, offer.isFavorite);

  const articleClassName = classNames(containerClassName, className);
  const linkSize = getImageSizeByViewType(viewType);
  const offerRoute = RoutesEnum.Offer.replace(':id', offer.id);
  const mouseOverArticleHandle = () => {
    if (onActivateOffer) {
      onActivateOffer(offer.id);
    }
  };

  const favoritesButtonClickHandler = () => {
    if (onFavoritesButtonClick) {
      onFavoritesButtonClick(offer.id, !offer.isFavorite);
    }
  };

  return (
    <article className={articleClassName} onMouseOver={onActivateOffer && mouseOverArticleHandle} data-testid='offer-card-component'>
      {offer.isPremium && <PremiumMark />}
      <div className={imageWrapperClassName}>
        <ImagedLink
          linkConfig={{
            to: offerRoute
          }}
          className='place-card__image'
          src={offer.previewImage}
          alt={offer.title}
          {...linkSize}
        />
      </div>
      <div className={cardInfoContainerClassName}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <FavoritesButton
            buttonClassName={bookmarkButtonClassName}
            onFavoritesClick={favoritesButtonClickHandler}
            iconClassName='place-card__bookmark-icon'
            iconSize={FAVORITES_BUTTON_SIZE}
            isFavorite={offer.isFavorite}
          />
        </div>
        <div className='place-card__rating rating' data-testid='rating-container'>
          <RatingInStars rating={offer.rating} className='place-card__stars rating__stars' />
        </div>
        <h2 className='place-card__name'>
          <Link to={offerRoute}>
            {offer.title}
          </Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
}
