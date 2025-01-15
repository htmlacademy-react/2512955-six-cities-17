import { ImageGallery } from '@shared/ui/gallery';
import PremiumMark from '@shared/ui/premium-mark';
import RatingInStars from '@shared/ui/rating-in-stars';
import { OfferFeaturesList } from '../offer-features-list';
import { OfferInsides } from '../offer-insides';
import { OfferHostInfo } from '../offer-host-info';
import LeafletMap, { LeafletPoint } from '@features/leaflet-map';
import { FullOfferInfo, MainOfferInfo } from '@entities/offer';
import { ComponentProps, PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';

type OfferInfoProps = PropsWithChildren<{
  offer: FullOfferInfo;
  nearOffers: MainOfferInfo[];
  onFavoritesButtonClick: (offerId: string, isFavorite: boolean) => void;
}>

const getMapProps = (offerPoint: LeafletPoint, nearOffers: MainOfferInfo[]): ComponentProps<typeof LeafletMap> => ({
  center: offerPoint,
  points: [offerPoint, ...nearOffers.map((current) => ({ location: current.location, name: current.title }))],
  selectedPoint: offerPoint
});

export function OfferInfo({ offer, nearOffers, children, onFavoritesButtonClick }: OfferInfoProps): JSX.Element {
  const offerPoint: LeafletPoint = useMemo(() => ({ location: offer.location, name: offer.title }), [offer.location, offer.title]);
  const mapProps = useMemo(() => getMapProps(offerPoint, nearOffers), [offerPoint, nearOffers]);

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
    <section className='offer'>
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
        <LeafletMap
          className='offer__map'
          center={mapProps.center}
          points={mapProps.points}
          selectedPoint={mapProps.selectedPoint}
        />
      </div>
    </section>
  );
}
