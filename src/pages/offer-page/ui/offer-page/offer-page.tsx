import Layout from '@widgets/layout';
import { PAGE_TITLE } from '@pages/offer-page/config';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { OfferInfo } from '../offer-info';
import { useCallback, useEffect } from 'react';
import OffersList from '@features/offers-list';
import { useParams } from 'react-router-dom';
import { useOfferPage } from '@pages/offer-page/lib/use-offer-page';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { NewReviewData } from '@entities/review';
import OfferReviews from '@widgets/offer-reviews';

type OfferPageUrlParams = {
  id: string;
}

const MAX_NEAR_OFFERS_COUNT = 3;

function OfferPage(): JSX.Element {
  const { id: offerId } = useParams<OfferPageUrlParams>();
  const {
    nearOffers: fullNearOffers,
    offer,
    comments,
    loading,
    fetchOfferPageInfo,
    addNewReview
  } = useOfferPage();

  const { setLoading } = useGlobalLoader();

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

  const nearOffers = fullNearOffers.slice(0, MAX_NEAR_OFFERS_COUNT);
  return (
    <Layout>
      <Layout.Header />
      <Layout.Content className='page__main--offer'>
        {offer && (
          <OfferInfo
            nearOffers={nearOffers}
            offer={offer}
          >
            {!!comments?.length && <OfferReviews reviews={comments} onReviewSubmit={reviewSubmitHandler} />}
          </OfferInfo>
        )}
        {nearOffers?.length && (
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <OffersList offers={nearOffers} viewType='near' />
            </section>
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
}

export const OfferPageWithBrowserTitle = componentWithBrowserTitle(OfferPage, PAGE_TITLE);
