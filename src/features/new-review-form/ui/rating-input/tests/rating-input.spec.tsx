import { render } from '@testing-library/react';
import { RatingInput } from '../rating-input';
import { RatingTitle } from '@features/new-review-form/config';
import { RatingValue } from '@shared/types';

describe('Component RatingInput', () => {
  const title = RatingTitle.Perfect;
  const onChangeRatingMock = vi.fn();

  it('should correct render', () => {
    const renderResult = render(
      <RatingInput onChangeRating={onChangeRatingMock} title={title} value={RatingValue.Perfect} checked />
    );

    expect(renderResult.container.querySelector('input[name="rating"]')).not.toBeNull();
    expect(renderResult.getByTitle(title)).toBeInTheDocument();
  });
});
