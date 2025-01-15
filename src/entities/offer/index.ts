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
import { offersListReducer, updateOffer as updateMainOffer } from './model/offer-info-slice';
import { favoritesOffersReducer, updateOffer as updateFavoriteOffer } from './model/favirites-offers-slice';
import { useOffersList } from './lib/use-offers-list';
import { useFavoritesOffers } from './lib/use-favorites-offers';

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
  useOffersList,
  useFavoritesOffers,
  favoritesOffersReducer,
  updateMainOffer,
  updateFavoriteOffer
};

export default OfferCard;
