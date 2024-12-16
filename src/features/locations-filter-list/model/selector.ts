import { OfferCityName } from '@entities/offer';
import type { RootState } from '@shared/lib/store';

export const getActiveLocation = (state: RootState): OfferCityName => state.activeLocation.location;
