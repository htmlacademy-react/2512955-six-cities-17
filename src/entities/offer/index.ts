import type {
  MainOfferInfo,
  City,
  OfferCityName,
  OfferType,
  FullOfferInfo,
  OfferHost,
  BaseOfferInfo,
  UnionOfferInfo,
} from './model/types';
import OfferCard, { type ViewType } from './ui/offer-card';
import { offersListReducer, updateOffer as updateMainOffer } from './model/offer-info-slice';
import { favoritesOffersReducer, updateOffer as updateFavoriteOffer } from './model/favirites-offers-slice';
import { useFavoritesOffersListData, useMainOffersListData } from './lib/use-offers-list-data';
import { useMainOffersListFetch, useFavoritesOffersListFetch } from './lib/use-offers-list-fetch';
import { unionToFullOfferInfoAdapter, unionToMainOfferInfoAdapter } from './lib/adapters/union-offer-info-adapters';
import { offersLoadingSelector } from './model/offer-info-slice';
import { favoritesLoadingSelector } from './model/favirites-offers-slice';

export type {
  MainOfferInfo,
  City,
  OfferCityName,
  OfferType,
  ViewType,
  FullOfferInfo,
  OfferHost,
  BaseOfferInfo,
  UnionOfferInfo
};

export {
  offersListReducer,
  useFavoritesOffersListData,
  useMainOffersListData,
  useMainOffersListFetch,
  useFavoritesOffersListFetch,
  favoritesOffersReducer,
  updateMainOffer,
  updateFavoriteOffer,
  unionToFullOfferInfoAdapter,
  unionToMainOfferInfoAdapter,
  favoritesLoadingSelector,
  offersLoadingSelector
};

export default OfferCard;
