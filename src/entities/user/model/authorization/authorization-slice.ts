import type { User } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import type { LoadableState, Nullable } from '@shared/types';
import { checkAuthorizationAction, loginAction, logoutAction } from './actions';
import { DEFAULT_AUTHORIZATION_CHECK_ERROR, DEFAULT_AUTHORIZATION_LOGIN_ERROR, DEFAULT_AUTHORIZATION_LOGOUT_ERROR } from '@entities/user/config/const';
import { AuthorizationStatusEnum } from '@shared/types';

type AuthorizationInfo = {
  status: AuthorizationStatusEnum;
  user: Nullable<User>;
}

const DEFAULT_AUTHORIZATION_INFO: AuthorizationInfo = {
  status: AuthorizationStatusEnum.Unknown,
  user: null
};

const initialState: LoadableState<AuthorizationInfo> = {
  error: null,
  loading: false,
  value: DEFAULT_AUTHORIZATION_INFO,
};

const authorizationSlice = createSlice({
  initialState,
  name: 'authorization',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkAuthorizationAction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = DEFAULT_AUTHORIZATION_INFO;
    });
    builder.addCase(checkAuthorizationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.value = {
        status: action.payload ? AuthorizationStatusEnum.Authorized : AuthorizationStatusEnum.NoAuthorized,
        user: action.payload
      };
      state.error = null;
    });
    builder.addCase(checkAuthorizationAction.rejected, (state, action) => {
      state.loading = false;
      state.value = {
        status: AuthorizationStatusEnum.NoAuthorized,
        user: null
      };
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_CHECK_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_CHECK_ERROR.message,
      };
    });

    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = DEFAULT_AUTHORIZATION_INFO;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.value = {
        status: AuthorizationStatusEnum.Authorized,
        user: action.payload
      };
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.value = {
        status: AuthorizationStatusEnum.NoAuthorized,
        user: null
      };
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_LOGIN_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_LOGIN_ERROR.message
      };
    });

    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
      state.value = {
        status: AuthorizationStatusEnum.NoAuthorized,
        user: null,
      };
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.error = {
        code: action.error?.code ?? DEFAULT_AUTHORIZATION_LOGOUT_ERROR.code,
        message: action.error?.message ?? DEFAULT_AUTHORIZATION_LOGOUT_ERROR.message
      };
    });
  },
});

export const authorizationSliceReducer = authorizationSlice.reducer;
