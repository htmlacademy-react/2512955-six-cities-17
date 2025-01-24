import { ReviewCard } from '../review-card';
import { createReviewMock } from '@test-utills/mock/review';
import { render } from '@testing-library/react';

const FICTIVE_DATE_DESCRIPTION = 'January 1';

vi.mock('@entities/review/lib/get-date-description', () => ({
  getDateDescription: vi.fn(() => FICTIVE_DATE_DESCRIPTION),
}));

describe('Component ReviewCard', () => {
  const reviewContainerTestId = 'review-rating-container';
  const reviewAvatarTestId = 'review-avatar';

  it('should correct render', () => {
    const reviewMock = createReviewMock();

    const screen = render(<ReviewCard review={reviewMock} />);

    expect(screen.getByTestId(reviewAvatarTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(reviewMock.comment)).toBeInTheDocument();
    expect(screen.getByText('January 1')).toBeInTheDocument();
  });
});
