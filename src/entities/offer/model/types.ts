import type { BaseFetchedState, Location } from '@shared/types';

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type OfferCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type City = {
  name: OfferCityName;
  location: Location;
}

export type OfferHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface BaseOfferInfo {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface MainOfferInfo extends BaseOfferInfo {
  previewImage: string;
}

export interface FullOfferInfo extends BaseOfferInfo {
  description: string;
  bedrooms: number;
  goods: string[];
  host: OfferHost;
  images: string[];
  maxAdults: number;
}

export type UnionOfferInfo = MainOfferInfo & FullOfferInfo;

export interface OfferListState extends BaseFetchedState {
  offers: MainOfferInfo[];
}
