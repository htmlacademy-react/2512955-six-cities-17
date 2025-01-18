import OfferReviews from '@widgets/offer-reviews';
import { useOfferReviewsData } from '@pages/offer-page/lib/offer-page-data';
import { ReactNode } from 'react';
import { NewReviewData } from '@entities/review';

type OfferReviewsSectionProps = {
  onReviewSubmit: (reviewData: NewReviewData) => Promise<void>;
}

export function OfferReviewsSection({ onReviewSubmit }: OfferReviewsSectionProps): ReactNode {
  const reviews = useOfferReviewsData();

  return reviews.length > 0
    ? <OfferReviews onReviewSubmit={onReviewSubmit} reviews={reviews} />
    : null;
}
