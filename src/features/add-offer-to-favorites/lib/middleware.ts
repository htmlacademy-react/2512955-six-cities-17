import { AxiosInstance } from 'axios';
import { ActionCreator, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { changeFavoriteAction } from './change-favorite-action';
import { ServerRoutesEnum } from '@shared/types';
import { generatePath } from 'react-router-dom';
import { MainOfferInfo } from '@entities/offer';

export const createAddToFavoriteMiddleware = (
  apiInstance: AxiosInstance,
  changeLoadingAction: ActionCreator<PayloadAction<boolean>>,
  updateOfferActions: ActionCreator<PayloadAction<MainOfferInfo>>[]
) => {
  const middleware: Middleware = ({ dispatch }) =>
    (next) =>
      async (action: ReturnType<typeof changeFavoriteAction>) => {
        if (action.type === changeFavoriteAction.toString()) {
          dispatch(changeLoadingAction(true));
          try {
            const changeFavoriteUrl = generatePath(ServerRoutesEnum.FavoriteChange, {
              offerId: action.payload.offerId,
              status: `${Number(action.payload.isFavorite)}`
            });

            const { data } = await apiInstance.post<MainOfferInfo>(changeFavoriteUrl);

            updateOfferActions.forEach((current) => {
              dispatch(current(data));
            });
          } finally {
            dispatch(changeLoadingAction(false));
          }
        }

        next(action);
      };

  return middleware;
};
