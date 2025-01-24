import type { NewReviewData, Review, ReviewAuthor } from '@entities/review';
import { RatingValue } from '@shared/types';
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

export const createNewReviewDataMock = (): NewReviewData => ({
  rating: faker.datatype.number({min: RatingValue.Terribly, max: RatingValue.Perfect}),
  review: faker.lorem.sentences(3)
});

export const creatNewReviewMock = (reviewData: NewReviewData): Review => ({
  comment: reviewData.review,
  date: faker.datatype.datetime().toISOString(),
  id: faker.datatype.uuid(),
  rating: reviewData.rating,
  user: createReviewAuthorMock()
});
