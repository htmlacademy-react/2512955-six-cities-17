import { RatingValue } from '../rating-input';

export type State = {
  rating: RatingValue | 0;
  review: string;
};
