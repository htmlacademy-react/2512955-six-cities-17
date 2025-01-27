import { OfferPageState } from '@pages/offer-page/model/offer-page-slice/types';
import { useNearOffersData } from '../use-near-offers-data';
import { createReviewMock } from '@test-utills/mock/review';
import { createFullOfferInfoMock, createMainOfferInfoMock } from '@test-utills/mock/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '@test-utills/mock/redux';
import { FC } from 'react';
import { getStoreWrapper } from '@test-utills/wrappers';
import { renderHook } from '@testing-library/react';

const PAGE_STATE_MOCK: OfferPageState = {
  comments: [createReviewMock()],
  error: null,
  loading: false,
  nearOffers: [createMainOfferInfoMock()],
  offer: createFullOfferInfoMock()
};

describe('Hook \'useNearOffersData\'', () => {
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>();
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator({fullScreanOffer: PAGE_STATE_MOCK});

    storeWrapper = getStoreWrapper(store);
  });

  it('should return correct signature', () => {
    const { result } = renderHook(() => useNearOffersData(), { wrapper: storeWrapper });

    expect(Array.isArray(result.current)).toBeTruthy();
  });

  it('should return near offers from store', () => {
    const { result } = renderHook(() => useNearOffersData(), { wrapper: storeWrapper });

    expect(result.current).toEqual(PAGE_STATE_MOCK.nearOffers);
  });
});
