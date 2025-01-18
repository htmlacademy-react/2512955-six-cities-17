import { NewReviewData } from '@entities/review';
import { addNewReviewAction, fetchOfferPageAction } from '@pages/offer-page/model/offer-page-slice/actions';
import { useAppDispatch } from '@shared/lib/store';
import { useCallback } from 'react';

type UseOfferPageQueriesReturn = {
  fetchOffer: (id: string) => Promise<void>;
  addNewReview: (offerId: string, reviewData: NewReviewData) => Promise<void>;
}

export function useOfferPageQueries(): UseOfferPageQueriesReturn {
  const dispatch = useAppDispatch();
  const fetchOfferPageInfo = useCallback(
    async (offerId: string) => {
      await dispatch(fetchOfferPageAction(offerId));
    },
    [dispatch]
  );

  const addNewReview = useCallback(
    async (offerId: string, reviewData: NewReviewData) => {
      await dispatch(addNewReviewAction({offerId, reviewData}));
    },
    [dispatch]
  );

  return {
    fetchOffer: fetchOfferPageInfo,
    addNewReview
  };
}
