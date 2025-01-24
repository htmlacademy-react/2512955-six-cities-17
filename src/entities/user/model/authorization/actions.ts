import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizedUser, User, AuthorizationData } from '../types';
import { AxiosInstance } from 'axios';
import { Nullable, RoutesEnum, ServerRoutesEnum } from '@shared/types';
import { tokenServiceInstance } from '@shared/lib/token-service';
import { redirectToRouteAction } from '@shared/lib/store';
import { AppDispatch } from '@shared/lib/store';

export const checkAuthorizationAction = createAsyncThunk<
  Nullable<User>,
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'authorization/check',
  async (_arg, { extra: apiInstance }) => {
    const authorizationToken = tokenServiceInstance.authorizationToken;
    if (authorizationToken.get()) {
      const { data } = await apiInstance.get<AuthorizedUser>(ServerRoutesEnum.Login);
      authorizationToken.set(data.token);
      return {
        avatarUrl: data.avatarUrl,
        email: data.email,
        isPro: data.isPro,
        name: data.name,
      };
    }
    return null;
  }
);

export const loginAction = createAsyncThunk<
  User,
  AuthorizationData,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>(
  'authorization/login',
  async (authData, { extra: apiInstance, dispatch }) => {
    tokenServiceInstance.authorizationToken.clear();
    const { data } = await apiInstance.post<AuthorizedUser>(ServerRoutesEnum.Login, authData);
    tokenServiceInstance.authorizationToken.set(data.token);
    dispatch(redirectToRouteAction({
      route: RoutesEnum.Main,
      replace: true
    }));
    return {
      avatarUrl: data.avatarUrl,
      email: data.email,
      isPro: data.isPro,
      name: data.name,
    };
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('authorization/logout',
  async (_, { extra: apiInstance, dispatch }) => {
    await apiInstance.delete(ServerRoutesEnum.Logout);
    tokenServiceInstance.authorizationToken.clear();
    dispatch(redirectToRouteAction({
      route: RoutesEnum.Login,
      replace: true
    }));
  }
);
