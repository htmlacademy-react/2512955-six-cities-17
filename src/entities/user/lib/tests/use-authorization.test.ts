import { Action, createAsyncThunk } from '@reduxjs/toolkit';
import { useAuthorization } from '../use-authorization';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/lib/store';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { FC } from 'react';
import { act, renderHook } from '@testing-library/react';
import { AuthorizationStatusEnum, Nullable } from '@shared/types';
import { getStoreWrapper } from '@test-utills/wrappers';
import { AuthorizationData, User } from '@entities/user/model/types';
import { createAuthorizationDataMock } from '@test-utills/mock/user';

enum AuthorizationActions {
  Check = 'authorization/check',
  Login = 'authorization/login',
  Logout = 'authorization/logout',
}

const STORE_AUTH_STATUS = AuthorizationStatusEnum.NoAuthorized;
const STORED_USER: Nullable<User> = null;

const fakeLoginFunction = vi.fn();
const fakeCheckFunction = vi.fn();
const fakeLogoutFunction = vi.fn();

const fakeCheckAuthorizationAction = createAsyncThunk<
  Nullable<User>,
  undefined
>(
  AuthorizationActions.Check,
  fakeCheckFunction
);

const fakeLoginAction = createAsyncThunk<
  User,
  AuthorizationData
>(
  AuthorizationActions.Login,
  fakeLoginFunction
);

const fakeLogoutAction = createAsyncThunk<
  void,
  undefined
>(AuthorizationActions.Logout,
  fakeLogoutFunction
);

describe('Hook \'useAuthorization\'', () => {
  const { middleware } = createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator({
      authorization: {
        loading: false,
        error: null,
        status: STORE_AUTH_STATUS,
        user: STORED_USER,
      }
    });
    fakeLoginFunction.mockReset();
    fakeCheckFunction.mockReset();
    fakeLogoutFunction.mockReset();
    storeWrapper = getStoreWrapper(store);
  });

  it('should return correct signature', () => {
    const stringType = 'string';
    const functionType = 'function';
    const objectType = 'object';
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      authorizationStatus,
      checkAuthorization,
      login,
      logout,
      user
    } = result.current;

    expect(typeof authorizationStatus).toBe(stringType);
    expect(typeof checkAuthorization).toBe(functionType);
    expect(typeof login).toBe(functionType);
    expect(typeof logout).toBe(functionType);
    expect(typeof user).toBe(objectType);
  });

  it('should return \'authorizationStatus\' from store', () => {
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      authorizationStatus,
    } = result.current;

    expect(authorizationStatus).toBe(STORE_AUTH_STATUS);
  });

  it('should return \'user\' from store', () => {
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      user,
    } = result.current;

    expect(user).toBe(STORED_USER);
  });

  it('should return correctly \'checkAuthorization\' method', async () => {
    vi.spyOn(await import('../../model/authorization/actions'), 'checkAuthorizationAction')
      .mockImplementation(fakeCheckAuthorizationAction);
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      checkAuthorization,
    } = result.current;

    await act(async () => await checkAuthorization());

    expect(fakeCheckFunction).toBeCalledTimes(1);
  });

  it('should return correctly \'login\' method', async () => {
    vi.spyOn(await import('../../model/authorization/actions'), 'loginAction')
      .mockImplementation(fakeLoginAction);
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      login,
    } = result.current;

    await act(async () => await login(createAuthorizationDataMock()));

    expect(fakeLoginFunction).toBeCalledTimes(1);
  });

  it('should return correctly \'logout\' method', async () => {
    vi.spyOn(await import('../../model/authorization/actions'), 'logoutAction')
      .mockImplementation(fakeLogoutAction);
    const { result } = renderHook(() => useAuthorization(), {wrapper: storeWrapper});
    const {
      logout,
    } = result.current;

    await act(async () => await logout());

    expect(fakeLogoutFunction).toBeCalledTimes(1);
  });
});
