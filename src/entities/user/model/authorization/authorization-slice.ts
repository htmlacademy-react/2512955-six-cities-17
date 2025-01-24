import type { User } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import type { Nullable, BaseFetchedState } from '@shared/types';
import { checkAuthorizationAction, loginAction, logoutAction } from './actions';
import { DEFAULT_AUTHORIZATION_CHECK_ERROR, DEFAULT_AUTHORIZATION_LOGIN_ERROR, DEFAULT_AUTHORIZATION_LOGOUT_ERROR } from '@entities/user/config/const';
import { AuthorizationStatusEnum } from '@shared/types';

export interface AuthorizationSliceState extends BaseFetchedState {
  status: AuthorizationStatusEnum;
  user: Nullable<User>;
}

const initialState: AuthorizationSliceState = {
  error: null,
  status: AuthorizationStatusEnum.Unknown,
  user: null,
};

const authorizationSlice = createSlice({
  initialState,
  name: 'authorization',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkAuthorizationAction.fulfilled, (state, action) => {
      state.status = action.payload ? AuthorizationStatusEnum.Authorized : AuthorizationStatusEnum.NoAuthorized;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(checkAuthorizationAction.rejected, (state, action) => {
      state.status = AuthorizationStatusEnum.NoAuthorized;
      state.user = null;
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_CHECK_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_CHECK_ERROR.message,
      };
    });

    builder.addCase(loginAction.pending, (state) => {
      state.error = null;
      state.status = AuthorizationStatusEnum.Unknown;
      state.user = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.error = null;
      state.status = AuthorizationStatusEnum.Authorized;
      state.user = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.status = AuthorizationStatusEnum.NoAuthorized;
      state.user = null;
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_LOGIN_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_LOGIN_ERROR.message
      };
    });

    builder.addCase(logoutAction.pending, (state) => {
      state.error = null;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.error = null;
      state.status = AuthorizationStatusEnum.NoAuthorized;
      state.user = null;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_LOGOUT_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_LOGOUT_ERROR.message
      };
    });
  },
});

export const authorizationSliceReducer = authorizationSlice.reducer;
