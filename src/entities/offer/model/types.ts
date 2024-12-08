import type { Location } from '@shared/types';

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type OfferCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type City = {
  name: OfferCityName;
  location: Location;
}

export type MainOfferInfo = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
