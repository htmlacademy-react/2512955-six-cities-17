import type { LoadableState, StateError } from '@shared/types';
import { StatusCodes } from 'http-status-codes';
import { MainOfferInfo } from '../model/types';

export const DEFAULT_LOADING_ERROR: StateError = {
  code: StatusCodes.BAD_REQUEST,
  message: 'Load failed',
};

export const STATE_TEMPLATE: LoadableState<MainOfferInfo[]> = {
  error: null,
  loading: false,
  value: []
};
