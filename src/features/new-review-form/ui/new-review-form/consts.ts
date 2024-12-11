import type { State } from './types';
import { RatingTitle, RatingValue } from '@features/new-review-form/config';

export const INITIAL_STATE: State = {
  rating: 0,
  review: ''
};

export const RATING_INPUTS_CONFIG = [
  { title: RatingTitle.Perfect, value: RatingValue.Perfect },
  { title: RatingTitle.Good, value: RatingValue.Good },
  { title: RatingTitle.NotBad, value: RatingValue.NotBad },
  { title: RatingTitle.Badly, value: RatingValue.Badly },
  { title: RatingTitle.Terribly, value: RatingValue.Terribly }
];
