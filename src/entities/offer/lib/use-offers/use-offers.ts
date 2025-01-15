import { RootState, useAppDispatch, useAppSelector } from '@shared/lib/store';
import { useCallback } from 'react';
import { BaseOfferInfo } from '@entities/offer/model/types';
import { LoadableState } from '@shared/types';
import type { AsyncThunk } from '@reduxjs/toolkit';

export type UseOffersReturn<TOfferType extends BaseOfferInfo[]> = {
  offers: LoadableState<TOfferType>['value'];
  loading: LoadableState<TOfferType>['loading'];
  error: LoadableState<TOfferType>['error'];
  getOffers: () => void;
}

export function useOffers<TOfferType extends BaseOfferInfo[], TThunk extends AsyncThunk<TOfferType, undefined, Record<string, unknown>>>(
  selector: (state: RootState) => LoadableState<TOfferType>,
  thunkAction: TThunk
): UseOffersReturn<TOfferType> {
  const dispatch = useAppDispatch();
  const {
    error,
    loading,
    value
  } = useAppSelector(selector);

  const getOffers = useCallback(
    () => {
      dispatch(thunkAction());
    },
    [dispatch, thunkAction]
  );

  return {
    error,
    loading,
    offers: value,
    getOffers
  };
}
