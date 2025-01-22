import { render } from '@testing-library/react';
import { NewReviewForm } from '../new-review-form';
import { RATING_INPUTS_CONFIG } from '../consts';

describe('Component NewReviewForm', () => {
  const onSubmitMock = vi.fn();
  const reviewTextareaPlaceholder = /Tell how was your stay, what you like and what can be improved/i;
  const promptText = /To submit review please make sure to set*/i;
  const submitButtonText = /^submit/i;

  it('should correct render', () => {
    const renderResult = render(
      <NewReviewForm onSubmit={onSubmitMock} />
    );

    expect(renderResult.container.querySelectorAll('input[name="rating"]').length).toBe(RATING_INPUTS_CONFIG.length);
    expect(renderResult.getByPlaceholderText(reviewTextareaPlaceholder)).toBeInTheDocument();
    expect(renderResult.getByText(promptText)).toBeInTheDocument();
    expect(renderResult.getByText(submitButtonText)).toBeInTheDocument();
  });
});
