import Layout from '@widgets/layout';
import { PAGE_TITLE } from '@pages/offer-page/config';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOfferPageQueries } from '@pages/offer-page/lib/use-offer-page-queries';
import { NewReviewData } from '@entities/review';
import { useAddToFavoriteOffer } from '@features/add-offer-to-favorites';
import { OfferMainInfoSection } from '../offer-main-info-section';
import { OfferReviewsSection } from '../offer-reviews-section';
import { NearOffersSection } from '../near-offers-section';

type OfferPageUrlParams = {
  id: string;
}


function OfferPage(): JSX.Element {
  const { id: offerId } = useParams<OfferPageUrlParams>();
  const favoriteButtonClickHandler = useAddToFavoriteOffer();
  const { fetchOffer, addNewReview } = useOfferPageQueries();

  useEffect(
    () => {
      const fetchOfferData = async (id: string) => {
        await fetchOffer(id);
      };

      if (offerId) {
        fetchOfferData(offerId);
      }
    },
    [fetchOffer, offerId]
  );

  const reviewSubmitHandler = useCallback(
    async (reviewData: NewReviewData) => {
      if (offerId) {
        await addNewReview(offerId, reviewData);
      }
    },
    [addNewReview, offerId]
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
