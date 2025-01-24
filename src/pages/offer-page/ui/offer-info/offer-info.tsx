import { ImageGallery } from '@shared/ui/gallery';
import PremiumMark from '@shared/ui/premium-mark';
import RatingInStars from '@shared/ui/rating-in-stars';
import { OfferFeaturesList } from '../offer-features-list';
import { OfferInsides } from '../offer-insides';
import { OfferHostInfo } from '../offer-host-info';
import { FullOfferInfo } from '@entities/offer';
import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';

type OfferInfoProps = PropsWithChildren<{
  leafletMap: ReactNode;
  offer: FullOfferInfo;
  onFavoritesButtonClick: (offerId: string, isFavorite: boolean) => void;
}>

export function OfferInfo({ offer, children, onFavoritesButtonClick, leafletMap }: OfferInfoProps): JSX.Element {
  const favoritesButtonClickHandler = () => {
    onFavoritesButtonClick(offer.id, !offer.isFavorite);
  };

  const favoritesButtonClassName = classNames(
    'offer__bookmark-button',
    {
      'offer__bookmark-button--active': offer.isFavorite
    },
    'button'
  );

  return (
    <section className='offer' data-testid='offer-info-section'>
      <div className='offer__gallery-container container'>
        <ImageGallery
          className='offer__gallery'
          items={offer.images}
          renderItem={({ alt, src, index }) => (
            <div key={`offer-pictures-${index}`} className='offer__image-wrapper'>
              <img className='offer__image' src={src} alt={alt} />
            </div>
          )}
        />
      </div>
      <div className='offer__container container'>
        <div className='offer__wrapper'>
          {offer.isPremium && <PremiumMark className='offer__mark' />}
          <div className='offer__name-wrapper'>
            <h1 className='offer__name'>
              {offer.title}
            </h1>
            <button className={favoritesButtonClassName} type='button' onClick={favoritesButtonClickHandler}>
              <svg className='offer__bookmark-icon' width='31' height='33'>
                <use xlinkHref='#icon-bookmark'></use>
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          </div>
          <div className='offer__rating rating'>
            <RatingInStars rating={offer.rating} className='offer__stars rating__stars' />
            <span className='offer__rating-value rating__value'>{offer.rating}</span>
          </div>
          <OfferFeaturesList bedrooms={offer.bedrooms} type={offer.type} maxAudits={offer.maxAdults} />
          <div className='offer__price'>
            <b className='offer__price-value'>&euro;{offer.price}</b>
            <span className='offer__price-text'>&nbsp;night</span>
          </div>
          {(!!offer?.goods?.length) && <OfferInsides insides={offer.goods} offerId={offer.id} />}
          <OfferHostInfo host={offer.host}>
            <div className='offer__description'>
              <p className='offer__text'>
                {offer.description}
              </p>
            </div>
          </OfferHostInfo>
          {children}
        </div>
      </div>
      <div className='container'>
        {leafletMap}
      </div>
    </section>
  );
}
