import type { StateError } from '@shared/types';
import { StatusCodes } from 'http-status-codes';
import { OfferListState } from '../model/types';

export const DEFAULT_LOADING_ERROR: StateError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Load failed',
};

export const STATE_TEMPLATE: OfferListState = {
  error: null,
  offers: []
};
