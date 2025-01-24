import type { FullOfferInfo, MainOfferInfo } from '@entities/offer';
import type { Review } from '@entities/review';
import type { BaseFetchedState, Nullable } from '@shared/types';

export interface OfferPageState extends BaseFetchedState {
  offer: Nullable<FullOfferInfo>;
  comments: Review[];
  nearOffers: MainOfferInfo[];
}
