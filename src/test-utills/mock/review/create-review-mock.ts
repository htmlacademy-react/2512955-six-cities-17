import type { Review, ReviewAuthor } from '@entities/review';
import faker from 'faker';

export const createReviewAuthorMock = (): ReviewAuthor => ({
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName()
});

export const createReviewMock = (): Review => ({
  id: faker.datatype.uuid(),
  comment: faker.lorem.words(3),
  date: faker.datatype.datetime().toISOString(),
  rating: faker.datatype.number({max: 5, min: 1}),
  user: createReviewAuthorMock()
});
