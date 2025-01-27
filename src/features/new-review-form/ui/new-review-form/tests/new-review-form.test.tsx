import { render } from '@testing-library/react';
import { NewReviewForm } from '../new-review-form';
import { RATING_INPUTS_CONFIG } from '../consts';
import { Nullable, RatingValue } from '@shared/types';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

vi.mock('@features/new-review-form/config/validation', () => ({
  REVIEW_LENGTH: {
    MIN: 5,
    MAX: 10
  },
  RATING_LENGTH: {
    MIN: 1,
    MAX: 5
  }
}));

const getRatingInput = (inputs: NodeListOf<Element>, value: RatingValue): Nullable<Element> => {
  const input = Array.from(inputs).find((current) => current.getAttribute('value') === String(value));

  if (input) {
    return input;
  }

  return null;
};

describe('Component NewReviewForm', () => {
  const reviewLength = {
    min: 5,
    max: 10
  };
  const ratingLength = {
    min: RatingValue.Terribly,
    max: RatingValue.Perfect
  };
  const validReviewText = faker.lorem.word(faker.datatype.number({min: reviewLength.min, max: reviewLength.max}));
  const validRatingValue = faker.datatype.number({max: ratingLength.max, min: ratingLength.min}) as RatingValue;
  const onSubmitMock = vi.fn();
  const reviewTextareaPlaceholder = /Tell how was your stay, what you like and what can be improved/i;
  const promptText = /To submit review please make sure to set*/i;
  const submitButtonText = /^submit/i;

  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    expect(screen.container.querySelectorAll('input[name="rating"]').length).toBe(RATING_INPUTS_CONFIG.length);
    expect(screen.getByPlaceholderText(reviewTextareaPlaceholder)).toBeInTheDocument();
    expect(screen.getByText(promptText)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });

  it('allows you to enter review text', async () => {
    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(reviewTextareaPlaceholder),
      validReviewText
    );

    expect(screen.getByDisplayValue(validReviewText)).toBeInTheDocument();
  });

  it.each<{value: RatingValue; caption: string}>(
    [
      {caption: 'Rating.Terribly', value: RatingValue.Terribly},
      {caption: 'Rating.Badly', value: RatingValue.Badly},
      {caption: 'Rating.NotBad', value: RatingValue.NotBad},
      {caption: 'Rating.Good', value: RatingValue.Good},
      {caption: 'Rating.Perfect', value: RatingValue.Perfect}
    ]
  )('allows you to set $caption', async ({ value }) => {
    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );
    const ratingInput = getRatingInput(
      screen.container.querySelectorAll('input[name="rating"]'),
      value
    );

    if (ratingInput) {
      expect(ratingInput.getAttribute('checked')).toBeFalsy();
      await userEvent.click(ratingInput);
      expect(expect(ratingInput.getAttribute('checked'))).toBeTruthy();
      return;
    }

    throw new Error();
  });

  it('should not call "onSumbit" function with review text not valid', async () => {
    const invalidReviewText = faker.lorem.word(reviewLength.max + 1);

    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(reviewTextareaPlaceholder),
      invalidReviewText
    );
    await userEvent.click(screen.getByText(submitButtonText));

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should not call "onSumbit" function with rating not set', async () => {
    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(reviewTextareaPlaceholder),
      validReviewText
    );
    await userEvent.click(screen.getByText(submitButtonText));

    expect(onSubmitMock).not.toBeCalled();
  });

  it('should call "onSumbit" function with rating is set and review text is valid', async () => {
    const screen = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(reviewTextareaPlaceholder),
      validReviewText
    );
    const ratingInput = getRatingInput(
      screen.container.querySelectorAll('input[name="rating"]'),
      validRatingValue
    );

    if (ratingInput) {
      await userEvent.click(ratingInput);
      await userEvent.click(screen.getByText(submitButtonText));
      expect(onSubmitMock).toBeCalledTimes(1);
      return;
    }

    throw new Error();
  });
});
