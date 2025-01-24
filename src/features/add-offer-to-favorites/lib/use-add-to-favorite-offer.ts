import { useCallback } from 'react';
import { useAppDispatch } from '@shared/lib/store';
import { changeFavoriteAction } from './change-favorite-action';
import { useAuthorization } from '@entities/user';
import { AuthorizationStatusEnum } from '@shared/types';
import { RoutesEnum } from '@shared/types';
import { useNavigate } from 'react-router-dom';

export function useAddToFavoriteOffer() {
  const dispatch = useAppDispatch();
  const { authorizationStatus } = useAuthorization();
  const navigate = useNavigate();

  const addToFavoriteOffer = useCallback(
    (offerId: string, isFavorite: boolean) => {
      if (authorizationStatus !== AuthorizationStatusEnum.Authorized) {
        navigate(RoutesEnum.Login, { replace: true });
        return;
      }

      dispatch(changeFavoriteAction({offerId, isFavorite}));
    },
    [authorizationStatus, dispatch, navigate]
  );

  return addToFavoriteOffer;
}
