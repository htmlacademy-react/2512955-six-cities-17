import { createAction } from '@reduxjs/toolkit';

type ChangeFavoriteActionPayload = {
  offerId: string;
  isFavorite: boolean;
}

export const changeFavoriteAction = createAction<ChangeFavoriteActionPayload>('changeFavorite/change');
