import { createAction } from '@reduxjs/toolkit';

export type ChangeFavoriteActionPayload = {
  offerId: string;
  isFavorite: boolean;
}

export const changeFavoriteAction = createAction<ChangeFavoriteActionPayload>('changeFavorite/change');
