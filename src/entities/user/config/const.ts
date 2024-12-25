import { StatusCodes } from 'http-status-codes';

export const DEFAULT_AUTHORIZATION_CHECK_ERROR = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Authorization check failed'
};

export const DEFAULT_AUTHORIZATION_LOGIN_ERROR = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Login failed'
};

export const DEFAULT_AUTHORIZATION_LOGOUT_ERROR = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Logout failed'
};
