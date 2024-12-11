import type { Review } from '@entities/review';

export const OFFER_COMMENTS_MOCK: Review[] = [
  {
    id: '0806bef5-c393-40d7-9658-55165a703b82',
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2024-11-16T21:00:00.526Z',
    rating: 3,
    user: {
      name: 'Kendall',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/6.jpg',
      isPro: false
    }
  },
  {
    id: '41d1bf90-a61d-4866-8579-d11d4ac5979b',
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2024-11-13T21:00:00.526Z',
    rating: 4,
    user: {
      name: 'Mollie',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: false
    }
  }
];
