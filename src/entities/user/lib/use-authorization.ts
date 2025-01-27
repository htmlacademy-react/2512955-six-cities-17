import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import {
  authorizationStatusSelector,
  authorizedUserSelector,
  loginAction,
  checkAuthorizationAction,
  logoutAction
} from '../model/authorization';
import { User } from '@entities/user';
import { AuthorizationStatusEnum, Nullable } from '@shared/types';
import { AuthorizationData } from '../model/types';
import { useCallback } from 'react';

type UseAuthorizationReturnType = {
  readonly user: Nullable<User>;
  readonly authorizationStatus: AuthorizationStatusEnum;
  readonly logout: () => Promise<void>;
  readonly login: (data: AuthorizationData) => Promise<void>;
  readonly checkAuthorization: () => Promise<void>;
}

export function useAuthorization(): UseAuthorizationReturnType {
  const user = useAppSelector(authorizedUserSelector);
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const dispatch = useAppDispatch();

  const checkAuthorization = useCallback(
    async () => {
      await dispatch(checkAuthorizationAction());
    },
    [dispatch]
  );

  const login = useCallback(
    async (data: AuthorizationData) => {
      await dispatch(loginAction(data));
    },
    [dispatch]
  );

  const logout = useCallback(
    async () => {
      await dispatch(logoutAction());
    },
    [dispatch]
  );

  return {
    user,
    authorizationStatus,
    logout,
    login,
    checkAuthorization
  };
}
