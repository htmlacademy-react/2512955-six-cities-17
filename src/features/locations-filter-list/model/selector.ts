import { OfferCityName } from '@entities/offer';
import type { RootState } from '@shared/lib/store';

export type ActiveLocationStatePick = Pick<RootState, 'activeLocation'>;
export const getActiveLocation = (state: ActiveLocationStatePick): OfferCityName => state.activeLocation.location;
