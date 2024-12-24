import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizedUser, User, AuthorizationData } from '../types';
import { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/types';
import { tokenServiceInstance } from '@shared/lib/token-service';

export const checkAuthorizationAction = createAsyncThunk<
  User,
  undefined,
  {
    extra: AxiosInstance;
  }
>(
  'authorization/check',
  async (_arg, { extra: apiInstance }) => {
    const { data } = await apiInstance.get<AuthorizedUser>(ServerRoutesEnum.Login);
    return {
      avatarUrl: data.avatarUrl,
      email: data.email,
      isPro: data.isPro,
      name: data.name,
    };
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
