import { OfferSortType } from '../model/types';

export const SUPPORTED_SORTING_TYPES: OfferSortType[] = [OfferSortType.Default, OfferSortType.IncreasePrice, OfferSortType.DecreasePrice, OfferSortType.DecreaseRating];

export const sortTypeToCaptionMap = new Map<OfferSortType, string>([
  [OfferSortType.Default, 'Popular'],
  [OfferSortType.IncreasePrice, 'Price: low to high'],
  [OfferSortType.DecreasePrice, 'Price: high to low'],
  [OfferSortType.DecreaseRating, 'Top rated first']
]);
