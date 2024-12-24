import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizedUser, User, AuthorizationData } from '../types';
import { AxiosInstance } from 'axios';
import { Nullable, ServerRoutesEnum } from '@shared/types';
import { tokenServiceInstance } from '@shared/lib/token-service';

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
    extra: AxiosInstance;
  }
>(
  'authorization/login',
  async (authData, { extra: apiInstance }) => {
    tokenServiceInstance.authorizationToken.clear();
    const { data } = await apiInstance.post<AuthorizedUser>(ServerRoutesEnum.Login, authData);
    tokenServiceInstance.authorizationToken.set(data.token);
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
    extra: AxiosInstance;
  }
>('authorization/logout',
  async (_, { extra: apiInstance }) => {
    await apiInstance.delete(ServerRoutesEnum.Logout);
    tokenServiceInstance.authorizationToken.clear();
  }
);
