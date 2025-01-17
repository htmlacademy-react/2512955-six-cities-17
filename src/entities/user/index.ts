import type { User, AuthorizationData } from './model/types';
import { useAuthorization } from './lib/use-authorization';
import UserInfo from './ui/user-info';
import { authorizationSliceReducer } from './model/authorization';

export type { User, AuthorizationData };
export {
  useAuthorization,
  UserInfo,
  authorizationSliceReducer
};
