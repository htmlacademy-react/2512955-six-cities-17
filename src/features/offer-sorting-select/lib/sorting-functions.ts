import { OfferSortType } from '../model/types';
import type { BaseOfferInfo } from '@entities/offer';

type OfferCompareFunction = (firstOffer: BaseOfferInfo, secondOffer: BaseOfferInfo) => number;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultCompare: OfferCompareFunction = (..._args) => 0;

const priceIncreaseCompare: OfferCompareFunction = (firstOffer, secondOffer) => firstOffer.price - secondOffer.price;

const priceDecreaseCompare: OfferCompareFunction = (firstOffer, secondOffer) => -1 * (firstOffer.price - secondOffer.price);

const ratingDecreaseCompare: OfferCompareFunction = (firstOffer, secondOffer) => -1 * (firstOffer.rating - secondOffer.rating);

export const offerSortTypeToComparerMap = new Map<OfferSortType, OfferCompareFunction>([
  [OfferSortType.Default, defaultCompare],
  [OfferSortType.IncreasePrice, priceIncreaseCompare],
  [OfferSortType.DecreasePrice, priceDecreaseCompare],
  [OfferSortType.DecreaseRating, ratingDecreaseCompare]
]);
