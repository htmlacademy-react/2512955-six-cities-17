import type { MainOfferInfo } from '@entities/offer';

export const OFFERS_INFO_MOCK: MainOfferInfo[] = [
  {
    id: '46eaa0f9-10f1-4ec6-8896-42011303e8dd',
    title: 'Loft Studio in the Central Area',
    type: 'hotel',
    price: 195,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 1.9
  },
  {
    id: '91697e35-fd70-4e5d-90d0-6ba34d3bb62d',
    title: 'The house among olive ',
    type: 'apartment',
    price: 245,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.385540000000006,
      longitude: 4.902976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.9
  },
  {
    id: '58139d48-b65e-4983-8ad9-47ebc207fab4',
    title: 'House in countryside',
    type: 'house',
    price: 903,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/6.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.397540000000006,
      longitude: 4.9099759999999995,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.1
  },
  {
    id: '649af4ac-8dbb-4d00-8ff3-49f2743d744b',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 226,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.37454,
      longitude: 4.881976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6
  },
  {
    id: '52effba5-45e7-4490-a1b5-e1d3abed8675',
    title: 'House in countryside',
    type: 'hotel',
    price: 298,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.367540000000005,
      longitude: 4.883976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.6
  },
];
