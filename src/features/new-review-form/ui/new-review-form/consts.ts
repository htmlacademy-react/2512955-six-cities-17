import type { NewReviewData } from '@entities/review';
import { RatingTitle } from '@features/new-review-form/config';
import { RatingValue } from '@shared/types';

export const INITIAL_STATE: NewReviewData = {
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
