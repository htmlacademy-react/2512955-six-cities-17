import type { User, AuthorizationData } from './model/types';
import { useAuthorization } from './lib/useAuthorization';
import UserInfo from './ui/user-info';
import { authorizationSliceReducer } from './model/authorization';

export type { User, AuthorizationData };
export {
  useAuthorization,
  UserInfo,
  authorizationSliceReducer
};
