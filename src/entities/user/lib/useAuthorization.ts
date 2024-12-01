import { useContext } from 'react';
import { userContext } from './authorization-context';
import { User } from '@entities/user';
import { Nullable } from '@shared/types';

type UseAuthorizationReturnType = {
  readonly user: Nullable<User>;
  readonly isAuthorized: boolean;
  readonly logout: () => void;
}

export function useAuthorization(): UseAuthorizationReturnType {
  const { user, setUser } = useContext(userContext);
  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthorized: user !== null,
    logout
  };
}
