import { ChangeEventHandler, useState } from 'react';
import { RatingInput, RatingValue } from '../rating-input';
import { RATING_INPUTS_CONFIG, INITIAL_STATE } from './consts';
import { State } from './types';
import { useValidate, ValidationConfig } from '@shared/hooks/use-validation';
import classNames from 'classnames';

const REVIEW_LENGTH = {
  MIN: 10,
  MAX: 30,
};

const validationScheme: ValidationConfig<State> = {
  rating: [
    {
      rule: (value) => value <= RatingValue.Perfect && value >= RatingValue.Terribly,
      errorMessage: 'Рейтинг может быть от 1 до 5 звёзд'
    }
  ],
  review: [
    {
      rule: (value) => value.length >= REVIEW_LENGTH.MIN,
      errorMessage: `Минимальная длина отзыва - ${REVIEW_LENGTH.MIN} символов`
    },
    {
      rule: (value) => value.length <= REVIEW_LENGTH.MAX,
      errorMessage: `Максимальная длина отзыва - ${REVIEW_LENGTH.MAX} символов`
    }
  ]
};

/**
 * @todo СДЕЛАТЬ ВАЛИДАЦИИ И САБМИТ!!
 */
export function NewReviewForm(): JSX.Element {
  const [reviewData, setReviewData] = useState(INITIAL_STATE);
  const { validationResult: { validations }, validateField } = useValidate<State>(validationScheme);

  const ratingContainerClassName = classNames(
    'reviews__rating-form',
    'form__rating',
    { ['error']: validations?.rating?.isNotValid }
  );

  const reviewInputClassName = classNames(
    'reviews__textarea',
    'form__textarea',
    { ['error']: validations?.review?.isNotValid }
  );

  const reviewDataChangeHandler = (controllerName: keyof State, value: State[typeof controllerName]): void => {
    setReviewData((prevState) => ({
      ...prevState,
      [controllerName]: value
    }));
    validateField(value, controllerName);
  };

  const onReviewChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => reviewDataChangeHandler('review', event.target.value);
  const onRatingChange = (rating: RatingValue) => reviewDataChangeHandler('rating', rating);

  return (
    <form className='reviews__form form' action='#' method='post'>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className={ratingContainerClassName}>
        {RATING_INPUTS_CONFIG.map((current) => (
          <RatingInput
            key={`rating-input-${current.value}`}
            onChangeRating={onRatingChange}
            {...current}
          />
        ))}
        {validations?.rating?.isNotValid && <small className='error-message'>{validations.rating?.message}</small>}
      </div>
      <textarea
        className={reviewInputClassName}
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={reviewData.review}
        onChange={onReviewChange}
      />
      {validations?.review?.isNotValid && <small className='error-message'>{validations.review?.message}</small>}
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled>Submit</button>
      </div>
    </form>
  );
}
