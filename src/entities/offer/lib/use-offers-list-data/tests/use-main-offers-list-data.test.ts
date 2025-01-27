import { renderHook } from '@testing-library/react';
import { useMainOffersListData } from '../use-main-offers-list-data';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '@test-utills/mock/redux';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { getStoreWrapper } from '@test-utills/wrappers';
import { FC } from 'react';

const OFFERS_MOCK = [
  createMainOfferInfoMock(),
  createMainOfferInfoMock()
];

describe('Hook \'useMainOffersListData\'', () => {
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>();
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator({
      offersList: {
        error: null,
        loading: false,
        offers: OFFERS_MOCK
      }
    });

    storeWrapper = getStoreWrapper(store);
  });

  it('should return correct signature', () => {
    const { result } = renderHook(() => useMainOffersListData(), { wrapper: storeWrapper });

    expect(Array.isArray(result.current)).toBeTruthy();
  });

  it('should return offers from store', () => {
    const { result } = renderHook(() => useMainOffersListData(), { wrapper: storeWrapper });

    expect(result.current).toEqual(OFFERS_MOCK);
  });
});
