import type { User } from '@entities/user';
import type { Nullable } from '@shared/types';
import { createContext } from 'react';

type UserContextValue = {
  user: Nullable<User>;
  setUser: (user: Nullable<User>) => void;
};

export const initialValue: UserContextValue = {
  user: null,
  setUser: () => {}
};

export const userContext = createContext(initialValue);
