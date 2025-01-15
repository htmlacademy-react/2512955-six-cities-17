import { useCallback } from 'react';
import { useAppDispatch } from '@shared/lib/store';
import { changeFavoriteAction } from './change-favorite-action';

export function useAddToFavoriteOffer() {
  const dispatch = useAppDispatch();

  const addToFavoriteOffer = useCallback(
    (offerId: string, isFavorite: boolean) => {
      dispatch(changeFavoriteAction({offerId, isFavorite}));
    },
    [dispatch]
  );

  return addToFavoriteOffer;
}
