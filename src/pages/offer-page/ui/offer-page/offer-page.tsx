import Layout from '@widgets/layout';
import { PAGE_TITLE } from '@pages/offer-page/config';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOfferPageQueries } from '@pages/offer-page/lib/use-offer-page-queries';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { NewReviewData } from '@entities/review';
import { useAuthorization } from '@entities/user';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { useAddToFavoriteOffer } from '@features/add-offer-to-favorites';
import { OfferMainInfoSection } from '../offer-main-info-section';
import { OfferReviewsSection } from '../offer-reviews-section';
import { NearOffersSection } from '../near-offers-section';

type OfferPageUrlParams = {
  id: string;
}


function OfferPage(): JSX.Element {
  const { id: offerId } = useParams<OfferPageUrlParams>();
  const { authorizationStatus } = useAuthorization();
  const navigate = useNavigate();
  const addOfferToFavorites = useAddToFavoriteOffer();
  const setLoading = useGlobalLoader();
  const { fetchOffer, addNewReview } = useOfferPageQueries();

  useEffect(
    () => {
      const fetchOfferData = async (id: string) => {
        setLoading(true);
        await fetchOffer(id);
        setLoading(false);
      };

      if (offerId) {
        fetchOfferData(offerId);
      }
    },
    [fetchOffer, offerId, setLoading]
  );

  const reviewSubmitHandler = useCallback(
    async (reviewData: NewReviewData) => {
      if (offerId) {
        setLoading(true);
        await addNewReview(offerId, reviewData);
        setLoading(false);
      }
    },
    [addNewReview, offerId, setLoading]
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

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content className='page__main--offer'>
        <OfferMainInfoSection onFavoriteButtonClick={favoriteButtonClickHandler}>
          <OfferReviewsSection onReviewSubmit={reviewSubmitHandler} />
        </OfferMainInfoSection>
        <NearOffersSection onFavoriteButtonClick={favoriteButtonClickHandler} />
      </Layout.Content>
    </Layout>
  );
}

export const OfferPageWithBrowserTitle = componentWithBrowserTitle(OfferPage, PAGE_TITLE);
