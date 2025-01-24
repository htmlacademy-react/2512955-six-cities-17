import ReviewCard, { Review, type NewReviewData } from '@entities/review';
import { useAuthorization } from '@entities/user';
import NewReviewForm from '@features/new-review-form';
import { AuthorizationStatusEnum } from '@shared/types';
import { ReactNode } from 'react';

type OfferReviewsProps = {
  onReviewSubmit: (reviewData: NewReviewData) => Promise<void>;
  reviews: Review[];
}

export function OfferReviews({ onReviewSubmit, reviews }: OfferReviewsProps): ReactNode {
  const { authorizationStatus } = useAuthorization();

  return (
    <section className='offer__reviews reviews' data-testid='offers-reviews-section'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>
      <ul className='reviews__list'>
        {reviews.map((current) => (
          <li key={current.id} className='reviews__item' data-testid='reviews-list-item'>
            <ReviewCard review={current} />
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatusEnum.Authorized && <NewReviewForm onSubmit={onReviewSubmit} />}
    </section>
  );
}
