import { fetchFavoritesOffersList } from '../actions';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { ServerRoutesEnum } from '@shared/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { isAllActionsContains } from '@test-utills/helpers/actions';

describe('Async "fetchFavoritesOffersList" action', () => {
  const { axiosMockAdapter, middleware } = createAppThunkMiddlewareMock();
  const middlewares = [middleware];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({favoritesOffers: {error: null, offers: []}});
  });

  it('should dispatch all necessary actions if resolved', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Favorite).reply(200);
    await store.dispatch(fetchFavoritesOffersList());

    const result = isAllActionsContains(
      store.getActions(),
      [fetchFavoritesOffersList.pending, fetchFavoritesOffersList.fulfilled]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Favorite).reply(404);
    await store.dispatch(fetchFavoritesOffersList());

    const result = isAllActionsContains(
      store.getActions(),
      [fetchFavoritesOffersList.pending, fetchFavoritesOffersList.rejected]
    );

    expect(result).toBeTruthy();
  });
});
