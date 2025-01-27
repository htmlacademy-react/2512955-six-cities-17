import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirectToRouteAction, RootState } from '@shared/lib/store';
import { createAppThunkMiddlewareMock, AppThunkDispatch } from '@test-utills/mock/redux';
import { Action } from '@reduxjs/toolkit';
import { addNewReviewAction, fetchOfferPageAction } from '../actions';
import { ServerRoutesEnum } from '@shared/types';
import { generatePath } from 'react-router-dom';
import faker from 'faker';
import { isActionsEquals } from '@test-utills/helpers/actions';
import { createFullOfferInfoMock } from '@test-utills/mock/offer';
import { createNewReviewDataMock, creatNewReviewMock } from '@test-utills/mock/review';

describe('Async offer page actions', () => {
  const { axiosMockAdapter, middleware, axiosInstance } = createAppThunkMiddlewareMock();
  const middlewares = [middleware];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;
  const offerId = faker.datatype.uuid();
  const offerInfoUrl = generatePath(ServerRoutesEnum.FullOffer, { id: offerId });
  const nearOffersUrl = generatePath(ServerRoutesEnum.NearOffers, { id: offerId });
  const reviewsUrl = generatePath(ServerRoutesEnum.Reviews, { offerId });

  beforeEach(() => {
    store = mockStoreCreator({ fullScreanOffer: { error: null, comments: [], nearOffers: [], offer: null, loading: false } });
  });

  describe('get offer data action', () => {
    it('should dispatch all necessary actions if resolved', async () => {
      axiosMockAdapter.onGet(offerInfoUrl).reply(200, createFullOfferInfoMock(offerId));
      axiosMockAdapter.onGet(nearOffersUrl).reply(200, []);
      axiosMockAdapter.onGet(reviewsUrl).reply(200, []);

      await store.dispatch(fetchOfferPageAction(offerId));
      const result = isActionsEquals(
        store.getActions(),
        [fetchOfferPageAction.pending, fetchOfferPageAction.fulfilled]
      );

      expect(result).toBeTruthy();
    });

    it('should not fetch near offers and reviews by offer fetch rejected', async () => {
      axiosMockAdapter.onGet(offerInfoUrl).reply(500);
      const spyedAxiosGet = vi.spyOn(axiosInstance, 'get');

      await store.dispatch(fetchOfferPageAction(offerId));

      expect(spyedAxiosGet).toBeCalledTimes(1);
    });

    it('should dispatch all necessary actions if any rejected', async () => {
      axiosMockAdapter.onGet(offerInfoUrl).reply(500);

      await store.dispatch(fetchOfferPageAction(offerId));
      const result = isActionsEquals(
        store.getActions(),
        [fetchOfferPageAction.pending, fetchOfferPageAction.rejected]
      );

      expect(result).toBeTruthy();
    });

    it('should dispatch all necessary actions if 404 by offer query', async () => {
      axiosMockAdapter.onGet(offerInfoUrl).reply(404);

      await store.dispatch(fetchOfferPageAction(offerId));
      const result = isActionsEquals(
        store.getActions(),
        [fetchOfferPageAction.pending, fetchOfferPageAction.rejected, redirectToRouteAction]
      );

      expect(result).toBeTruthy();
    });
  });

  describe('add new review action', () => {
    const addReviewUrl = generatePath(ServerRoutesEnum.Reviews, { offerId: offerId });
    const newReviewDataMock = createNewReviewDataMock();

    it('should dispatch all necessary actions if resolved', async () => {
      const responceData = creatNewReviewMock(newReviewDataMock);
      axiosMockAdapter.onPost(addReviewUrl).reply(200, responceData);

      await store.dispatch(addNewReviewAction({offerId, reviewData: newReviewDataMock}));


      const result = isActionsEquals(
        store.getActions(),
        [addNewReviewAction.pending, addNewReviewAction.fulfilled]
      );

      expect(result).toBeTruthy();
    });

    it('should dispatch all necessary actions if rejected', async () => {
      axiosMockAdapter.onPost(addReviewUrl).reply(500);

      await store.dispatch(addNewReviewAction({offerId, reviewData: newReviewDataMock}));
      const result = isActionsEquals(
        store.getActions(),
        [addNewReviewAction.pending, addNewReviewAction.rejected]
      );

      expect(result).toBeTruthy();
    });
  });
});
