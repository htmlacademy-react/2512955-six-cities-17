import type { RootState } from '@shared/lib/store';

export type FavoriteOffersPickState = Pick<RootState, 'favoritesOffers'>;
export const favoritesOffersSelector = (state: FavoriteOffersPickState) => state.favoritesOffers.offers;
