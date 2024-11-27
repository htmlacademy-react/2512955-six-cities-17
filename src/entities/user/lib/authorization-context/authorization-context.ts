import type { User } from '@entities/user';
import type { Nullable } from '@shared/types';
import { createContext } from 'react';
import { USE_MOCK_USER } from '@entities/user/config/variables';
import { USER_MOCK } from '@entities/user/mock/user-mock';

type UserContextValue = {
  user: Nullable<User>;
};

export const initialValue: UserContextValue = {
  user: USE_MOCK_USER ? USER_MOCK : null
};

export const userContext = createContext(initialValue);
