import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { authorizationSelector, loginAction, checkAuthorizationAction, logoutAction } from '../model/authorization';
import { User } from '@entities/user';
import { AuthorizationStatusEnum, Nullable } from '@shared/types';
import { AuthorizationData } from '../model/types';
import { useCallback } from 'react';

type UseAuthorizationReturnType = {
  readonly user: Nullable<User>;
  readonly authorizationStatus: AuthorizationStatusEnum;
  readonly loading: boolean;
  readonly logout: () => void;
  readonly login: (data: AuthorizationData) => void;
  readonly checkAuthorization: () => void;
}

export function useAuthorization(): UseAuthorizationReturnType {
  const { value: authorizationInfo, loading } = useAppSelector(authorizationSelector);
  const dispatch = useAppDispatch();

  const checkAuthorization = useCallback(
    () => {
      dispatch(checkAuthorizationAction());
    },
    [dispatch]
  );

  const login = useCallback(
    (data: AuthorizationData) => {
      dispatch(loginAction(data));
    },
    [dispatch]
  );

  const logout = useCallback(
    () => {
      dispatch(logoutAction());
    },
    [dispatch]
  );

  return {
    loading,
    user: authorizationInfo.user,
    authorizationStatus: authorizationInfo.status,
    logout,
    login,
    checkAuthorization
  };
}
