import Layout from '@widgets/layout';
import { PAGE_TITLE } from '@pages/offer-page/config';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { OfferInfo } from '../offer-info';
import { useCallback, useEffect } from 'react';
import OffersList from '@features/offers-list';
import { useNavigate, useParams } from 'react-router-dom';
import { useOfferPage } from '@pages/offer-page/lib/use-offer-page';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { NewReviewData } from '@entities/review';
import OfferReviews from '@widgets/offer-reviews';
import { useAuthorization } from '@entities/user';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { useAddToFavoriteOffer } from '@features/add-offer-to-favorites';

type OfferPageUrlParams = {
  id: string;
}

const MAX_NEAR_OFFERS_COUNT = 3;

function OfferPage(): JSX.Element {
  const { id: offerId } = useParams<OfferPageUrlParams>();
  const { authorizationStatus } = useAuthorization();
  const navigate = useNavigate();
  const addOfferToFavorites = useAddToFavoriteOffer();
  const {
    nearOffers: fullNearOffers,
    offer,
    loading,
    fetchOfferPageInfo,
    addNewReview
  } = useOfferPage();

  const setLoading = useGlobalLoader();

  useEffect(
    () => {
      setLoading(loading);
    },
    [loading, setLoading]
  );

  useEffect(
    () => {
      if (offerId) {
        fetchOfferPageInfo(offerId);
      }
    },
    [fetchOfferPageInfo, offerId]
  );

  const reviewSubmitHandler = useCallback(
    (reviewData: NewReviewData) => {
      if (offerId) {
        addNewReview(reviewData, offerId);
      }
    },
    [addNewReview, offerId]
  );

  const favoriteButtonClickHandler = useCallback(
    (id: string, isFavorite: boolean) => {
      if (authorizationStatus !== AuthorizationStatusEnum.Authorized) {
        navigate(RoutesEnum.Login, { replace: true });
        return;
      }

      addOfferToFavorites(id, isFavorite);
    },
    [addOfferToFavorites, authorizationStatus, navigate]
  );

  const nearOffers = fullNearOffers.slice(0, MAX_NEAR_OFFERS_COUNT);
  return (
    <Layout>
      <Layout.Header />
      <Layout.Content className='page__main--offer'>
        {offer && (
          <OfferInfo
            nearOffers={nearOffers}
            offer={offer}
            onFavoritesButtonClick={favoriteButtonClickHandler}
          >
            <OfferReviews onReviewSubmit={reviewSubmitHandler} />
          </OfferInfo>
        )}
        {!!nearOffers?.length && (
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <OffersList offers={nearOffers} viewType='near' onFavoriteClick={favoriteButtonClickHandler} />
            </section>
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
}

export const OfferPageWithBrowserTitle = componentWithBrowserTitle(OfferPage, PAGE_TITLE);
