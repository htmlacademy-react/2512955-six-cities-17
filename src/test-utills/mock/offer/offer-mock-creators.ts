import faker from 'faker';
import { Location } from '@shared/types';
import type {
  UnionOfferInfo,
  FullOfferInfo,
  MainOfferInfo,
  City,
  OfferHost,
} from '@entities/offer';

export const createLocationMock = (): Location => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number(13),
});


export const createCityMock = (): City => ({
  location: createLocationMock(),
  name: 'Amsterdam'
});

export const createOfferHostMock = (): OfferHost => ({
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
  name: faker.name.title(),
});

export const createUnionOfferInfoMock = (offerId?: string): UnionOfferInfo => ({
  id: offerId ?? faker.datatype.uuid(),
  bedrooms: faker.datatype.number(),
  city: createCityMock(),
  description: faker.lorem.paragraph(3),
  goods: Array.from({length: faker.datatype.number({min: 1, max: 12})}).map(() => faker.lorem.words(2)),
  type: 'apartment',
  title: faker.lorem.sentence(3),
  maxAdults: faker.datatype.number(),
  price: faker.datatype.number(),
  rating: faker.datatype.number(5),
  previewImage: faker.image.imageUrl(),
  images: Array.from({length: 5}).map(() => faker.image.imageUrl()),
  host: createOfferHostMock(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: createLocationMock(),
});

export const createMainOfferInfoMock = (offerId?: string): MainOfferInfo => ({
  city: createCityMock(),
  id: offerId ?? faker.datatype.uuid(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: createLocationMock(),
  previewImage: faker.image.imageUrl(),
  price: faker.datatype.number(),
  rating: faker.datatype.number({max: 5, min: 1}),
  title: faker.lorem.sentence(3),
  type: 'hotel',
});

export const createFullOfferInfoMock = (offerId?: string): FullOfferInfo => ({
  id: offerId ?? faker.datatype.uuid(),
  bedrooms: faker.datatype.number(),
  city: createCityMock(),
  description: faker.lorem.paragraph(3),
  goods: Array.from({length: faker.datatype.number({min: 1, max: 12})}).map(() => faker.lorem.words(2)),
  type: 'apartment',
  title: faker.lorem.sentence(3),
  maxAdults: faker.datatype.number(),
  price: faker.datatype.number(),
  rating: faker.datatype.number(5),
  images: Array.from({length: 5}).map(() => faker.image.imageUrl()),
  host: createOfferHostMock(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: createLocationMock(),
});
