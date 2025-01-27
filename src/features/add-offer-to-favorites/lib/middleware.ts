import { AxiosInstance } from 'axios';
import { ActionCreatorWithPayload, Middleware } from '@reduxjs/toolkit';
import { changeFavoriteAction } from './change-favorite-action';
import { ServerRoutesEnum } from '@shared/types';
import { generatePath } from 'react-router-dom';
import { UnionOfferInfo } from '@entities/offer';

export const createAddToFavoriteMiddleware = (
  apiInstance: AxiosInstance,
  changeLoadingAction: ActionCreatorWithPayload<boolean>,
  updateOfferActions: ActionCreatorWithPayload<UnionOfferInfo>[],
  errorHandler?: (error: unknown) => void
) => {
  const middleware: Middleware = ({ dispatch }) =>
    (next) =>
      async (action: ReturnType<typeof changeFavoriteAction>) => {
        if (action.type === changeFavoriteAction.toString()) {
          try {
            dispatch(changeLoadingAction(true));
            const changeFavoriteUrl = generatePath(ServerRoutesEnum.FavoriteChange, {
              offerId: action.payload.offerId,
              status: `${Number(action.payload.isFavorite)}`
            });

            const { data } = await apiInstance.post<UnionOfferInfo>(changeFavoriteUrl);

            await Promise.all([
              updateOfferActions.map((current) => dispatch(current(data)))
            ]);
          } catch(err) {
            if (errorHandler) {
              errorHandler(err);
            }
          } finally {
            dispatch(changeLoadingAction(false));
          }
        }

        next(action);
      };

  return middleware;
};
