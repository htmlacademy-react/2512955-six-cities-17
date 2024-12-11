import { RatingValue } from '@features/new-review-form/config';

export type State = {
  rating: RatingValue | 0;
  review: string;
};
