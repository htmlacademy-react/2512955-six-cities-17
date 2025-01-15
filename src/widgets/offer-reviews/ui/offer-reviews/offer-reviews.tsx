import ReviewCard, { type NewReviewData } from '@entities/review';
import { useAuthorization } from '@entities/user';
import NewReviewForm from '@features/new-review-form';
import { useOfferPage } from '@pages/offer-page/lib/use-offer-page';
import { AuthorizationStatusEnum } from '@shared/types';
import { ReactNode } from 'react';

type OfferReviewsProps = {
  onReviewSubmit: (reviewData: NewReviewData) => void;
}

export function OfferReviews({ onReviewSubmit }: OfferReviewsProps): ReactNode {
  const { authorizationStatus } = useAuthorization();
  const { comments } = useOfferPage();

  if (comments.length <= 0) {
    return null;
  }

  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{comments.length}</span></h2>
      <ul className='reviews__list'>
        {comments.map((current) => (
          <li key={current.id} className='reviews__item'>
            <ReviewCard review={current} />
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatusEnum.Authorized && <NewReviewForm onSubmit={onReviewSubmit} />}
    </section>
  );
}
