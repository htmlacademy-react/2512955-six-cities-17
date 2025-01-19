import { StateError } from '@shared/types';
import { StatusCodes } from 'http-status-codes';

export const DEFAULT_FETCH_OFFER_ERROR: StateError = {
  code: String(StatusCodes.BAD_REQUEST),
  message: 'Fetch offer info failed'
};

export const DEFAULT_ADD_NEW_REVIEW_ERROR = {
  code: String(StatusCodes.BAD_REQUEST),
  message: 'Add new comment request failed'
};
