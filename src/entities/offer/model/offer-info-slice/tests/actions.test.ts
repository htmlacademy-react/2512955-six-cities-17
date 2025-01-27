import { fetchOffersList } from '../actions';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { ServerRoutesEnum } from '@shared/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { isActionsEquals } from '@test-utills/helpers/actions';

describe('Async "fetchOffersList" action', () => {
  const { axiosMockAdapter, middleware } = createAppThunkMiddlewareMock();
  const middlewares = [middleware];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({offersList: {error: null, offers: [], loading: false}});
  });

  it('should dispatch all necessary actions if resolved', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Offers).reply(200);
    await store.dispatch(fetchOffersList());

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchOffersList.pending,
        fetchOffersList.fulfilled,
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Offers).reply(404);
    await store.dispatch(fetchOffersList());

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchOffersList.pending,
        fetchOffersList.rejected,
      ]
    );

    expect(result).toBeTruthy();
  });
});
