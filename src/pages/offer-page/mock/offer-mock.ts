import type { FullOfferInfo, MainOfferInfo } from '@entities/offer';

export const OFFER_MOCK: FullOfferInfo = {
  id: 'a27bd42a-001d-4cfd-a897-4f66f643e3fe',
  title: 'The house among olive ',
  description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  type: 'house',
  price: 378,
  images: [
    'https://16.design.htmlacademy.pro/static/hotel/4.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/13.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/14.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/10.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/15.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/19.jpg'
  ],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  goods: [
    'Fridge',
    'Washer',
    'Breakfast',
    'Wi-Fi',
    'Laptop friendly workspace',
    'Air conditioning'
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  isPremium: true,
  isFavorite: false,
  rating: 1.7,
  bedrooms: 2,
  maxAdults: 3
};

export const NEAR_OFFERS_MOCK: MainOfferInfo[] = [
  {
    id: '90559437-f185-46da-b281-e4c9a760accd',
    title: 'Perfectly located Castro',
    type: 'apartment',
    price: 221,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/10.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.8
  },
  {
    id: '72ff8de2-a7b9-4c14-84f3-c25d1d489cdb',
    title: 'House in countryside',
    type: 'room',
    price: 257,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.4
  },
  {
    id: '3386ffb8-1d55-4f9e-b224-b642d67d36e0',
    title: 'The Pondhouse - A Magical Place',
    type: 'room',
    price: 247,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.3
  },
  {
    id: '809e4853-3c67-4ae4-a653-13eb44500220',
    title: 'Amazing and Extremely Central Flat',
    type: 'apartment',
    price: 447,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.4
  },
];
