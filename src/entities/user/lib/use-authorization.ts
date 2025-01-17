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
import { useGlobalLoader } from '@shared/hooks/use-global-loader';

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
  const setLoading = useGlobalLoader();

  const checkAuthorization = useCallback(
    async () => {
      setLoading(true);
      await dispatch(checkAuthorizationAction());
      setLoading(false);
    },
    [dispatch, setLoading]
  );

  const login = useCallback(
    async (data: AuthorizationData) => {
      setLoading(true);
      await dispatch(loginAction(data));
      setLoading(false);
    },
    [dispatch, setLoading]
  );

  const logout = useCallback(
    async () => {
      setLoading(true);
      await dispatch(logoutAction());
      setLoading(false);
    },
    [dispatch, setLoading]
  );

  return {
    user,
    authorizationStatus,
    logout,
    login,
    checkAuthorization
  };
}
