import { FullOfferInfo, MainOfferInfo, UnionOfferInfo } from '@entities/offer/model/types';

export const unionToMainOfferInfoAdapter = (unionOffer: UnionOfferInfo): MainOfferInfo => ({
  id: unionOffer.id,
  city: unionOffer.city,
  isFavorite: unionOffer.isFavorite,
  isPremium: unionOffer.isPremium,
  location: unionOffer.location,
  previewImage: unionOffer.previewImage,
  price: unionOffer.price,
  rating: unionOffer.rating,
  title: unionOffer.title,
  type: unionOffer.type,
});

export const unionToFullOfferInfoAdapter = (unionOffer: UnionOfferInfo): FullOfferInfo => ({
  id: unionOffer.id,
  city: unionOffer.city,
  isFavorite: unionOffer.isFavorite,
  isPremium: unionOffer.isPremium,
  location: unionOffer.location,
  price: unionOffer.price,
  rating: unionOffer.rating,
  title: unionOffer.title,
  type: unionOffer.type,
  bedrooms: unionOffer.bedrooms,
  description: unionOffer.description,
  goods: unionOffer.goods,
  host: unionOffer.host,
  images: unionOffer.images,
  maxAdults: unionOffer.maxAdults
});
