import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { offersListSelector, fetchOffersList } from '@entities/offer/model/offers-info-slice';
import { useCallback } from 'react';

type OffersListSelectorReturn = ReturnType<typeof offersListSelector>;

type UseOffersListReturn = {
  offersList: OffersListSelectorReturn['value'];
  loading: OffersListSelectorReturn['loading'];
  error: OffersListSelectorReturn['error'];
  fetchList: () => void;
}

export function useOffersList(): UseOffersListReturn {
  const dispatch = useAppDispatch();
  const {
    error,
    loading,
    value
  } = useAppSelector(offersListSelector);

  const fetchList = useCallback(
    () => {
      dispatch(fetchOffersList());
    },
    [dispatch]
  );

  return {
    error,
    loading,
    offersList: value,
    fetchList
  };
}
