import type { RootState } from '@shared/lib/store';

export type OfferListPickState = Pick<RootState, 'offersList'>;

export const offersListSelector = (state: OfferListPickState) => state.offersList.offers;
