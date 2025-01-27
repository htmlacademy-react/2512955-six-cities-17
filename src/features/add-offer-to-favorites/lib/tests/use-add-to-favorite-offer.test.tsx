import { act, renderHook } from '@testing-library/react';
import { useAddToFavoriteOffer } from '../use-add-to-favorite-offer';
import { changeFavoriteAction } from '../change-favorite-action';
import faker from 'faker';
import { isActionsEquals } from '@test-utills/helpers/actions';
import { createMemoryHistory } from 'history';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { getStoreWrapper } from '@test-utills/wrappers';
import { FC } from 'react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '@test-utills/mock/redux';
import { createUserMock } from '@test-utills/mock/user';

const INITIAL_ROUTE = '/initial-route';

describe('Hook \'useAddToFavoriteOffer\'', () => {
  const history = createMemoryHistory();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>();
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
    store = storeCreator();
    storeWrapper = getStoreWrapper(store, history);
  });

  it('should return correct signature', async () => {
    const functionType = 'function';
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Unknown,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));
    const { result } = renderHook(() => useAddToFavoriteOffer(), { wrapper: storeWrapper });
    expect(typeof result.current).toBe(functionType);
  });

  it('should return correct function whitch is dispatch \'changeFavoriteAction\' by authorized user', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Authorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: createUserMock()
      }));
    const { result: hookResult } = renderHook(() => useAddToFavoriteOffer(), { wrapper: storeWrapper });
    const offerId = faker.datatype.uuid();
    const isFavorite = faker.datatype.boolean();

    act(() => hookResult.current(offerId, isFavorite));

    const result = isActionsEquals(store.getActions(), [changeFavoriteAction]);
    expect(result).toBeTruthy();
  });

  it('should return correct function whitch navigated \'Routes.Login\' if not authorized user', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.NoAuthorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));
    const { result: hookResult } = renderHook(() => useAddToFavoriteOffer(), { wrapper: storeWrapper });
    const offerId = faker.datatype.uuid();
    const isFavorite = faker.datatype.boolean();

    act(() => hookResult.current(offerId, isFavorite));

    const result = isActionsEquals(store.getActions(), [changeFavoriteAction]);
    expect(result).toBeFalsy();
    expect(history.location.pathname).toBe(RoutesEnum.Login);
  });
});
