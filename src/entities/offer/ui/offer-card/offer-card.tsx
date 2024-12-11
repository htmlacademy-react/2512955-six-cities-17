import type { Classed } from '@shared/types';
import PremiumMark from '@shared/ui/premium-mark';
import RatingInStars from '@shared/ui/rating-in-stars';
import classNames from 'classnames';
import type { MainOfferInfo } from '../../model/types';
import { getOfferCardStyles, getImageSizeByViewType } from './get-styles';
import type { ViewType } from './types';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';
import { Link } from 'react-router-dom';

type OfferCardProps = Classed<{
  offer: MainOfferInfo;
  viewType?: ViewType;
  onActivateOffer?: (offerId: string) => void;
}>;

export function OfferCard({ offer, className, onActivateOffer, viewType = 'main' }: OfferCardProps): JSX.Element {
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

  return (
    <article className={articleClassName} onMouseOver={onActivateOffer && mouseOverArticleHandle}>
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
          <button className={bookmarkButtonClassName} type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
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
