import type { FullOfferInfo, MainOfferInfo } from '@entities/offer';
import { NewReviewData, Review } from '@entities/review';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import type { Nullable } from '@shared/types';
import { fullOfferInfoSelector } from '@pages/offer-page/model/offer-page-slice';
import { useCallback } from 'react';
import { fetchOfferPageAction, addNewReviewAction } from '@pages/offer-page/model/offer-page-slice/actions';

type UseOfferPageReturn = {
  loading: boolean;
  offer: Nullable<FullOfferInfo>;
  comments: Review[];
  nearOffers: MainOfferInfo[];
  fetchOfferPageInfo: (offerId: string) => void;
  addNewReview: (reviewData: NewReviewData, offerId: string) => void;
}

export function useOfferPage(): UseOfferPageReturn {
  const {
    loading,
    value
  } = useAppSelector(fullOfferInfoSelector);

  const dispatch = useAppDispatch();

  const fetchOfferPageInfo = useCallback(
    (offerId: string) => {
      dispatch(fetchOfferPageAction(offerId));
    },
    [dispatch]
  );

  const addNewReview = useCallback(
    (reviewData: NewReviewData, offerId: string) => {
      dispatch(addNewReviewAction({
        offerId,
        reviewData
      }));
    },
    [dispatch]
  );

  return {
    loading,
    comments: value.comments,
    nearOffers: value.nearOffers,
    offer: value.offer,
    fetchOfferPageInfo,
    addNewReview
  };
}
