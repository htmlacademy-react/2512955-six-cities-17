import { useContext } from 'react';
import { userContext } from './authorization-context';
import { User } from '@entities/user';
import { Nullable } from '@shared/types';

type UseAuthorizationReturnType = {
  readonly user: Nullable<User>;
  readonly isAuthorized: boolean;
}

export function useAuthorization(): UseAuthorizationReturnType {
  const { user } = useContext(userContext);
  return {
    user,
    isAuthorized: user !== null
  };
}
