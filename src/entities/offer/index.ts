import type {
  MainOfferInfo,
  City,
  OfferCityName,
  OfferType,
  FullOfferInfo,
  OfferHost,
  BaseOfferInfo
} from './model/types';
import OfferCard, { type ViewType } from './ui/offer-card';
import { offersListReducer } from './model/offer-info-slice';
import { useOffersList } from './lib/use-offers-list';

export type {
  MainOfferInfo,
  City,
  OfferCityName,
  OfferType,
  ViewType,
  FullOfferInfo,
  OfferHost,
  BaseOfferInfo
};

export {
  offersListReducer,
  useOffersList
};

export default OfferCard;
