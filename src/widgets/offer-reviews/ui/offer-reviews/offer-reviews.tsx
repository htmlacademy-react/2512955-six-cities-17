import ReviewCard, { type NewReviewData, type Review } from '@entities/review';
import { useAuthorization } from '@entities/user';
import NewReviewForm from '@features/new-review-form';
import { AuthorizationStatusEnum } from '@shared/types';

type OfferReviewsProps = {
  reviews: Review[];
  onReviewSubmit: (reviewData: NewReviewData) => void;
}

export function OfferReviews({ reviews, onReviewSubmit }: OfferReviewsProps): JSX.Element {
  const { authorizationStatus } = useAuthorization();

  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>
      <ul className='reviews__list'>
        {reviews.map((current) => (
          <li key={current.id} className='reviews__item'>
            <ReviewCard review={current} />
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatusEnum.Authorized && <NewReviewForm onSubmit={onReviewSubmit} />}
    </section>
  );
}
