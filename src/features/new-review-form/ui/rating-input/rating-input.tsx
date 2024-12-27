import { ChangeEventHandler } from 'react';
import { INPUT_ELEMENT_SIZE } from './consts';
import { RatingTitle } from '@features/new-review-form/config';
import { RatingValue } from '@shared/types';

type RatingInputProps = {
  value: RatingValue;
  title: RatingTitle;
  checked: boolean;
  onChangeRating: (rating: RatingValue) => void;
}

export function RatingInput({ title, value, onChangeRating, checked }: RatingInputProps): JSX.Element {
  const inputId = `${value}-stars`;

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    onChangeRating(value);
  };

  return (
    <>
      <input className='form__rating-input visually-hidden' name='rating' checked={checked} value={value} id={inputId} type='radio' onChange={inputChangeHandler} />
      <label htmlFor={inputId} className='reviews__rating-label form__rating-label' title={title}>
        <svg className='form__star-image' {...INPUT_ELEMENT_SIZE}>
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </>
  );
}
