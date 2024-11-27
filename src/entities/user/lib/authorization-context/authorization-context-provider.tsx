import type { PropsWithChildren } from 'react';
import { initialValue, userContext } from './authorization-context';

const UserContext = userContext;

export function AuthorizationContextProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <UserContext.Provider value={initialValue}>
      {children}
    </UserContext.Provider>
  );
}
