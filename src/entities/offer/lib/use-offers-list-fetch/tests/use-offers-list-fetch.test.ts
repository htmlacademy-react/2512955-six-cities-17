import { renderHook } from '@testing-library/react';
import { useOffersListFetch } from '../use-offers-list-fetch';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { getStoreWrapper } from '@test-utills/wrappers';
import { FC } from 'react';
import { MainOfferInfo } from '@entities/offer/model/types';
import { isActionsEquals } from '@test-utills/helpers/actions';

const OFFER_FETCH_MOCK = vi.fn(() => [createMainOfferInfoMock()]);

export const testAsyncAction = createAsyncThunk<
  MainOfferInfo[],
  undefined
>(
  'test/fetch',
  OFFER_FETCH_MOCK,
);

describe('Hook \'useMainOffersListData\'', () => {
  const { middleware } = createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator();
    storeWrapper = getStoreWrapper(store);
    OFFER_FETCH_MOCK.mockReset();
  });

  it('should return correct signature', () => {
    const functionType = 'function';
    const { result } = renderHook(() => useOffersListFetch(testAsyncAction), { wrapper: storeWrapper });

    expect(typeof result.current).toBe(functionType);
  });

  it('should dispatch all actions by test action fullfilled', async () => {
    const { result } = renderHook(() => useOffersListFetch(testAsyncAction), { wrapper: storeWrapper });

    await result.current();
    const isExpectedActions = isActionsEquals(store.getActions(), [
      testAsyncAction.pending,
      testAsyncAction.fulfilled
    ]);

    expect(OFFER_FETCH_MOCK).toBeCalledTimes(1);
    expect(isExpectedActions).toBeTruthy();
  });

  it('should dispatch all actions by test action rejected', async () => {
    const { result } = renderHook(() => useOffersListFetch(testAsyncAction), { wrapper: storeWrapper });
    OFFER_FETCH_MOCK.mockImplementationOnce(() => {
      throw new Error();
    });
    await result.current();
    const isExpectedActions = isActionsEquals(store.getActions(), [
      testAsyncAction.pending,
      testAsyncAction.rejected
    ]);

    expect(OFFER_FETCH_MOCK).toBeCalledTimes(1);
    expect(isExpectedActions).toBeTruthy();
  });
});
