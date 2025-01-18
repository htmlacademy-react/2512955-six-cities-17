import { useAppSelector } from '@shared/lib/store';
import { offerReviewsSelector } from '@pages/offer-page/model/offer-page-slice';
import { Review } from '@entities/review';

export function useOfferReviewsData(): Review[] {
  const reviews = useAppSelector(offerReviewsSelector);
  return reviews;
}
