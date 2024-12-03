import { useState, type PropsWithChildren } from 'react';
import { userContext } from './authorization-context';
import { Nullable } from '@shared/types';
import { User } from '@entities/user/model/types';
import { USER_MOCK } from '@entities/user/mock/user-mock';
import { USE_MOCK_USER } from '@entities/user/config/variables';

const UserContext = userContext;

export function AuthorizationContextProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<Nullable<User>>(USE_MOCK_USER ? USER_MOCK : null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
