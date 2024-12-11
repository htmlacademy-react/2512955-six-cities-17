import ReviewCard, { type Review } from '@entities/review';
import NewReviewForm from '@features/new-review-form';

type OfferReviewsProps = {
  reviews: Review[];
}

export function OfferReviews({ reviews }: OfferReviewsProps): JSX.Element {
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
      <NewReviewForm />
    </section>
  );
}
