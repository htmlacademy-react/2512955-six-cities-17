import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  checkAuthorizationAction,
  loginAction,
  logoutAction
} from '../actions';
import { redirectToRouteAction, RootState } from '@shared/lib/store';
import { AppThunkDispatch, createAppThunkMiddlewareMock } from '@test-utills/mock/redux';
import { AuthorizationStatusEnum, ServerRoutesEnum } from '@shared/types';
import { Action } from '@reduxjs/toolkit';
import { createAuthorizationDataMock } from '@test-utills/mock/user';
import { createAuthorizedUserMock } from '@test-utills/mock/user/create-user-mock';
import { isActionsEquals } from '@test-utills/helpers/actions';
import { tokenServiceInstance } from '@shared/lib/token-service';
import faker from 'faker';

vi.mock('@shared/lib/token-service', () => ({
  tokenServiceInstance: {
    authorizationToken: {
      set: vi.fn(),
      get: vi.fn(),
      clear: vi.fn(),
    }
  }
}));


describe('Authorization async actions', () => {
  const { axiosMockAdapter, middleware, axiosInstance } = createAppThunkMiddlewareMock();
  const middlewares = [middleware];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ authorization: { error: null, user: null, status: AuthorizationStatusEnum.Unknown } });
  });

  describe('check authorization action', () => {
    it('should not send query if not exists token', async () => {
      vi.spyOn(tokenServiceInstance.authorizationToken, 'get')
        .mockReturnValueOnce(null);
      const spyedAxiosGet = vi.spyOn(axiosInstance, 'get');
      await store.dispatch(checkAuthorizationAction());

      expect(spyedAxiosGet).not.toBeCalled();
    });

    it('should send query if exists token', async () => {
      vi.spyOn(tokenServiceInstance.authorizationToken, 'get')
        .mockReturnValueOnce(faker.datatype.string(20));
      const spyedAxiosGet = vi.spyOn(axiosInstance, 'get');

      await store.dispatch(checkAuthorizationAction());

      expect(spyedAxiosGet).toBeCalledTimes(1);
      spyedAxiosGet.mockClear();
    });

    it('should set authorization token if resolved', async () => {
      vi.spyOn(tokenServiceInstance.authorizationToken, 'get')
        .mockImplementation(() => faker.datatype.string(20));
      const responseData = createAuthorizedUserMock();
      axiosMockAdapter.onGet(ServerRoutesEnum.Login).reply(200, responseData);
      const spyedSetToken = vi.spyOn(tokenServiceInstance.authorizationToken, 'set');

      await store.dispatch(checkAuthorizationAction());

      expect(spyedSetToken).toBeCalledTimes(1);
    });

    it('should not set authorization token if rejected', async () => {
      vi.spyOn(tokenServiceInstance.authorizationToken, 'get')
        .mockImplementation(() => faker.datatype.string(20));
      axiosMockAdapter.onGet(ServerRoutesEnum.Login).reply(403);
      const spyedSetToken = vi.spyOn(tokenServiceInstance.authorizationToken, 'set');

      await store.dispatch(checkAuthorizationAction());

      expect(spyedSetToken).not.toBeCalled();
    });

    it('should dispatch all necessary actions if resolved', async () => {
      axiosMockAdapter.onGet(ServerRoutesEnum.Login).reply(200, createAuthorizedUserMock());

      await store.dispatch(checkAuthorizationAction());
      const result = isActionsEquals(
        store.getActions(),
        [checkAuthorizationAction.pending, checkAuthorizationAction.fulfilled]
      );

      expect(result).toBeTruthy();
    });

    it('should dispatch all necessary actions if rejected', async () => {
      vi.spyOn(tokenServiceInstance.authorizationToken, 'get')
        .mockImplementation(() => faker.datatype.string(20));
      axiosMockAdapter.onGet(ServerRoutesEnum.Login).reply(401);

      await store.dispatch(checkAuthorizationAction());
      const result = isActionsEquals(
        store.getActions(),
        [checkAuthorizationAction.pending, checkAuthorizationAction.rejected]
      );

      expect(result).toBeTruthy();
    });
  });

  describe('login action', () => {
    it('should dispatch all necessary actions if resolved', async () => {
      const responseData = createAuthorizedUserMock();
      axiosMockAdapter.onPost(ServerRoutesEnum.Login).reply(200, responseData);

      await store.dispatch(loginAction(createAuthorizationDataMock()));

      const result = isActionsEquals(
        store.getActions(),
        [redirectToRouteAction, loginAction.pending, loginAction.fulfilled]
      );

      expect(result).toBeTruthy();
    });

    it('should set authorization token if resolved', async () => {
      const responseData = createAuthorizedUserMock();
      axiosMockAdapter.onPost(ServerRoutesEnum.Login).reply(200, responseData);
      const spyedSetToken = vi.spyOn(tokenServiceInstance.authorizationToken, 'set');

      await store.dispatch(loginAction(createAuthorizationDataMock()));

      expect(spyedSetToken).toBeCalledTimes(1);
    });

    it('should dispatch all necessary actions if rejected', async () => {
      axiosMockAdapter.onPost(ServerRoutesEnum.Login).reply(401);

      await store.dispatch(loginAction(createAuthorizationDataMock()));

      const result = isActionsEquals(
        store.getActions(),
        [loginAction.pending, loginAction.rejected]
      );

      expect(result).toBeTruthy();
    });

    it('should not set authorization token if rejected', async () => {
      axiosMockAdapter.onPost(ServerRoutesEnum.Login).reply(401);
      const spyedSetToken = vi.spyOn(tokenServiceInstance.authorizationToken, 'set');

      await store.dispatch(loginAction(createAuthorizationDataMock()));

      expect(spyedSetToken).not.toBeCalled();
    });
  });

  describe('logout action', () => {
    it('should clear token if resolved', async () => {
      const spyedTokenClear = vi.spyOn(tokenServiceInstance.authorizationToken, 'clear');
      axiosMockAdapter.onDelete(ServerRoutesEnum.Logout).reply(200);

      await store.dispatch(logoutAction());

      expect(spyedTokenClear).toBeCalledTimes(1);
    });

    it('should not clear token if rejected', async () => {
      const spyedTokenClear = vi.spyOn(tokenServiceInstance.authorizationToken, 'clear');
      axiosMockAdapter.onDelete(ServerRoutesEnum.Logout).reply(500);

      await store.dispatch(logoutAction());

      expect(spyedTokenClear).not.toBeCalled();
    });

    it('should dispatch all necessary actions if resolved', async () => {
      axiosMockAdapter.onDelete(ServerRoutesEnum.Logout).reply(200);

      await store.dispatch(logoutAction());
      const result = isActionsEquals(
        store.getActions(),
        [redirectToRouteAction, logoutAction.pending, logoutAction.fulfilled]
      );

      expect(result).toBeTruthy();
    });

    it('should dispatch all necessary actions if rejected', async () => {
      axiosMockAdapter.onDelete(ServerRoutesEnum.Logout).reply(500);

      await store.dispatch(logoutAction());
      const result = isActionsEquals(
        store.getActions(),
        [logoutAction.pending, logoutAction.rejected]
      );

      expect(result).toBeTruthy();
    });
  });
});
