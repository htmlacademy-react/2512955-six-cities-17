import { UserInfo } from '@entities/user';
import Layout from '@widgets/layout';
import { OFFER_MOCK, NEAR_OFFERS_MOCK } from '@pages/offer-page/mock/offer-mock';
import { ImageGallery } from '@shared/ui/gallery';
import RatingInStars from '@shared/ui/rating-in-stars';
import PremiumMark from '@shared/ui/premium-mark';
import { PAGE_TITLE } from '@pages/offer-page/config';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { OfferFeaturesList } from '../offer-features-list';
import { OfferInsides } from '../offer-insides';
import { OfferHostInfo } from '../offer-host-info';
import { OFFER_COMMENTS_MOCK } from '@pages/offer-page/mock/comment-mock';
import OfferReviews from '@widgets/offer-reviews';
import OffersList from '@features/offers-list';
import LeafletMap, {type LeafletPoint } from '@features/leaflet-map';
import { MainOfferInfo } from '@entities/offer';
import { ComponentProps, useMemo } from 'react';

type OfferPageProps = {
  favoritesCount: number;
}

const MAX_NEAR_OFFERS_COUNT = 3;

const getMapProps = (offerPoint: LeafletPoint, nearOffers: MainOfferInfo[]): ComponentProps<typeof LeafletMap> => ({
  center: offerPoint,
  points: [offerPoint, ...nearOffers.map((current) => ({location: current.location, name: current.title}))],
  selectedPoint: offerPoint
});

function OfferPage({ favoritesCount }: OfferPageProps): JSX.Element {
  const nearOffers = useMemo(() => NEAR_OFFERS_MOCK.slice(0, MAX_NEAR_OFFERS_COUNT), []);
  const offerPoint: LeafletPoint = useMemo(() => ({location: OFFER_MOCK.location, name: OFFER_MOCK.title}), []);
  const mapProps = useMemo(() => getMapProps(offerPoint, nearOffers), [offerPoint, nearOffers]);
  return (
    <Layout>
      <Layout.Header>
        <UserInfo favoritesCount={favoritesCount} />
      </Layout.Header>
      <Layout.Content className='page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container container'>
            <ImageGallery
              className='offer__gallery'
              items={OFFER_MOCK.images}
              renderItem={({ alt, src, index }) => (
                <div key={`offer-pictures-${index}`} className='offer__image-wrapper'>
                  <img className='offer__image' src={src} alt={alt} />
                </div>
              )}
            />
          </div>
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              {OFFER_MOCK.isPremium && <PremiumMark className='offer__mark' />}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>
                  {OFFER_MOCK.title}
                </h1>
                <button className='offer__bookmark-button button' type='button'>
                  <svg className='offer__bookmark-icon' width='31' height='33'>
                    <use xlinkHref='#icon-bookmark'></use>
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='offer__rating rating'>
                <RatingInStars rating={OFFER_MOCK.rating} className='offer__stars rating__stars' />
                <span className='offer__rating-value rating__value'>{OFFER_MOCK.rating}</span>
              </div>
              <OfferFeaturesList bedrooms={OFFER_MOCK.bedrooms} type={OFFER_MOCK.type} maxAudits={OFFER_MOCK.maxAdults} />
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{OFFER_MOCK.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              {(OFFER_MOCK.goods && OFFER_MOCK.goods.length > 0) && <OfferInsides insides={OFFER_MOCK.goods} offerId={OFFER_MOCK.id} />}
              <OfferHostInfo host={OFFER_MOCK.host}>
                <div className='offer__description'>
                  <p className='offer__text'>
                    {OFFER_MOCK.description}
                  </p>
                </div>
              </OfferHostInfo>
              <OfferReviews reviews={OFFER_COMMENTS_MOCK} />
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
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OffersList offers={NEAR_OFFERS_MOCK} viewType='near' />
          </section>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export const OfferPageWithBrowserTitle = componentWithBrowserTitle(OfferPage, PAGE_TITLE);
