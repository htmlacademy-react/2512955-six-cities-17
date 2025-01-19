import { StateError } from '@shared/types';
import { StatusCodes } from 'http-status-codes';

export const DEFAULT_AUTHORIZATION_CHECK_ERROR: StateError = {
  code: String(StatusCodes.BAD_REQUEST),
  message: 'Authorization check failed'
};

export const DEFAULT_AUTHORIZATION_LOGIN_ERROR = {
  code: String(StatusCodes.BAD_REQUEST),
  message: 'Login failed'
};

export const DEFAULT_AUTHORIZATION_LOGOUT_ERROR = {
  code: String(StatusCodes.BAD_REQUEST),
  message: 'Logout failed'
};
