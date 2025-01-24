import { MainOfferInfo } from '@entities/offer/model/types';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '@shared/lib/store';
import { useCallback } from 'react';

type UseOffersListFetchReturn = () => Promise<void>;

export function useOffersListFetch<
  TOfferType extends MainOfferInfo,
  TThunk extends AsyncThunk<TOfferType[], undefined, Record<string, unknown>>>(
  thunk: TThunk
): UseOffersListFetchReturn {
  const dispatch = useAppDispatch();

  const fetchOffers = useCallback(
    async () => {
      await dispatch(thunk());
    },
    [dispatch, thunk]
  );

  return fetchOffers;
}
