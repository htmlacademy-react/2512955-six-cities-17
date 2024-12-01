import { ChangeEventHandler } from 'react';
import { RatingTitle, RatingValue, INPUT_ELEMENT_SIZE } from './consts';

type RatingInputProps = {
  value: RatingValue;
  title: RatingTitle;
  onChangeRating: (rating: RatingValue) => void;
}

export function RatingInput({ title, value, onChangeRating }: RatingInputProps): JSX.Element {
  const inputId = `${value}-stars`;

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    onChangeRating(value);
  };

  return (
    <>
      <input className='form__rating-input visually-hidden' name='rating' value={value} id={inputId} type='radio' onChange={inputChangeHandler} />
      <label htmlFor={inputId} className='reviews__rating-label form__rating-label' title={title}>
        <svg className='form__star-image' {...INPUT_ELEMENT_SIZE}>
          <use xlinkHref='#icon-star'></use>
        </svg>
      </label>
    </>
  );
}
