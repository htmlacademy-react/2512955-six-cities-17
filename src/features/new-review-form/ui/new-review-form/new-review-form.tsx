import { ChangeEventHandler, useState } from 'react';
import { RatingInput, RatingValue } from '../rating-input';
import { RATING_INPUTS_CONFIG, INITIAL_STATE } from './consts';

/**
 * @todo СДЕЛАТЬ ВАЛИДАЦИИ И САБМИТ!!
 */
export function NewReviewForm(): JSX.Element {
  const [reviewData, setReviewData] = useState(INITIAL_STATE);

  const onRatingChange = (rating: RatingValue) => {
    setReviewData({
      ...reviewData,
      rating
    });
  };

  const onReviewTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setReviewData({
      ...reviewData,
      review: event.target.value
    });
  };

  return (
    <form className='reviews__form form' action='#' method='post'>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {RATING_INPUTS_CONFIG.map((current) => (
          <RatingInput
            key={`rating-input-${current.value}`}
            onChangeRating={onRatingChange}
            {...current}
          />
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={reviewData.review}
        onChange={onReviewTextChange}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled>Submit</button>
      </div>
    </form>
  );
}
