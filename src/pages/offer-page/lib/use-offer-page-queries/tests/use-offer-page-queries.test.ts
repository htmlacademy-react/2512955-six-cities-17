import { configureMockStore } from '@jedmao/redux-mock-store';
import { OfferPageState } from '@pages/offer-page/model/offer-page-slice/types';
import { Action, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib/store';
import { createFullOfferInfoMock, createMainOfferInfoMock } from '@test-utills/mock/offer';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { createNewReviewDataMock, createReviewMock } from '@test-utills/mock/review';
import { getStoreWrapper } from '@test-utills/wrappers';
import { renderHook } from '@testing-library/react';
import { FC } from 'react';
import { useOfferPageQueries } from '../use-offer-page-queries';
import { NewReviewData, Review } from '@entities/review';
import faker from 'faker';
import { isActionsEquals } from '@test-utills/helpers/actions';

const OFFER_PAGE_STATE_MOCK: OfferPageState = {
  comments: [createReviewMock()],
  error: null,
  loading: false,
  nearOffers: [createMainOfferInfoMock()],
  offer: createFullOfferInfoMock()
};

const OFFER_PAGE_QUERY_MOCK = vi.fn<[string], OfferPageState>(() => OFFER_PAGE_STATE_MOCK);
const ADD_NEW_REVIEW_QUERY_MOCK = vi.fn<[{offerId: string; reviewData: NewReviewData}], Review>();

const fakeFetchOfferAsyncAction = createAsyncThunk<
  OfferPageState,
  string
>(
  'test/fetchPage',
  OFFER_PAGE_QUERY_MOCK,
);

const fakeAddNewReviewAsyncAction = createAsyncThunk<
  Review,
  {
    offerId: string;
    reviewData: NewReviewData;
  }
>(
  'test/postReview',
  ADD_NEW_REVIEW_QUERY_MOCK
);

describe('Hook \'useOfferPageQueries\'', () => {
  const { middleware } = createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator();
    storeWrapper = getStoreWrapper(store);
    OFFER_PAGE_QUERY_MOCK.mockReset();
    ADD_NEW_REVIEW_QUERY_MOCK.mockReset();
  });

  it('should return correct signature', () => {
    const functionType = 'function';
    const { result } = renderHook(() => useOfferPageQueries(), {wrapper: storeWrapper});
    const { addNewReview, fetchOffer } = result.current;

    expect(typeof addNewReview).toBe(functionType);
    expect(typeof fetchOffer).toBe(functionType);
  });

  it('should return correct \'fetchOffer\' method if fetch resolved', async () => {
    const offerId = faker.datatype.uuid();
    vi.spyOn(await import('@pages/offer-page/model/offer-page-slice/actions'), 'fetchOfferPageAction')
      .mockImplementation(fakeFetchOfferAsyncAction);
    const { result } = renderHook(() => useOfferPageQueries(), {wrapper: storeWrapper});
    const { fetchOffer } = result.current;

    await fetchOffer(offerId);

    const isExpectedActions = isActionsEquals(store.getActions(), [
      fakeFetchOfferAsyncAction.pending,
      fakeFetchOfferAsyncAction.fulfilled
    ]);

    expect(isExpectedActions).toBeTruthy();
  });

  it('should return correct \'fetchOffer\' method if fetch rejected', async () => {
    const offerId = faker.datatype.uuid();
    OFFER_PAGE_QUERY_MOCK.mockImplementationOnce(() => {
      throw new Error();
    });
    vi.spyOn(await import('@pages/offer-page/model/offer-page-slice/actions'), 'fetchOfferPageAction')
      .mockImplementation(fakeFetchOfferAsyncAction);
    const { result } = renderHook(() => useOfferPageQueries(), {wrapper: storeWrapper});
    const { fetchOffer } = result.current;

    await fetchOffer(offerId);

    const isExpectedActions = isActionsEquals(store.getActions(), [
      fakeFetchOfferAsyncAction.pending,
      fakeFetchOfferAsyncAction.rejected
    ]);

    expect(isExpectedActions).toBeTruthy();
  });

  it('should return correct \'addNewReview\' method if post resolved', async () => {
    const offerId = faker.datatype.uuid();
    vi.spyOn(await import('@pages/offer-page/model/offer-page-slice/actions'), 'addNewReviewAction')
      .mockImplementation(fakeAddNewReviewAsyncAction);
    const { result } = renderHook(() => useOfferPageQueries(), {wrapper: storeWrapper});
    const { addNewReview } = result.current;

    await addNewReview(offerId, createNewReviewDataMock());

    const isExpectedActions = isActionsEquals(store.getActions(), [
      fakeAddNewReviewAsyncAction.pending,
      fakeAddNewReviewAsyncAction.fulfilled
    ]);

    expect(isExpectedActions).toBeTruthy();
  });

  it('should return correct \'addNewReview\' method if post rejected', async () => {
    ADD_NEW_REVIEW_QUERY_MOCK.mockImplementationOnce(() => {
      throw new Error();
    });
    const offerId = faker.datatype.uuid();
    vi.spyOn(await import('@pages/offer-page/model/offer-page-slice/actions'), 'addNewReviewAction')
      .mockImplementation(fakeAddNewReviewAsyncAction);
    const { result } = renderHook(() => useOfferPageQueries(), {wrapper: storeWrapper});
    const { addNewReview } = result.current;

    await addNewReview(offerId, createNewReviewDataMock());

    const isExpectedActions = isActionsEquals(store.getActions(), [
      fakeAddNewReviewAsyncAction.pending,
      fakeAddNewReviewAsyncAction.rejected
    ]);

    expect(isExpectedActions).toBeTruthy();
  });
});
