import type { RootState } from '@shared/lib/store';

type OfferListSliceState = Pick<RootState, 'offersList'>;

export const offersListSelector = (state: OfferListSliceState) => state.offersList.offers;
