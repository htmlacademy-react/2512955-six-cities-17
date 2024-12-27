import type { FullOfferInfo, MainOfferInfo } from '@entities/offer';
import type { Review } from '@entities/review';
import type { Nullable } from '@shared/types';

export type OfferPageState = {
  offer: Nullable<FullOfferInfo>;
  comments: Review[];
  nearOffers: MainOfferInfo[];
};
