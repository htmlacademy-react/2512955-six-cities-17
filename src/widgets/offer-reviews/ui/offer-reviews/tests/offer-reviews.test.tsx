import { OfferReviews } from '../offer-reviews';
import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { withStore } from '@test-utills/hocs';
import faker from 'faker';
import { createReviewMock } from '@test-utills/mock/review';
import { AuthorizationStatusEnum } from '@shared/types';
import { createUserMock } from '@test-utills/mock/user';

const createPropsMock = (reviewsCount: number): ComponentProps<typeof OfferReviews> => ({
  onReviewSubmit: vi.fn(),
  reviews: faker.datatype.array(reviewsCount).map(() => createReviewMock())
});

describe('Component OfferReviews', () => {
  const reviewFormTestId = 'new-review-form-element';
  const reviewListItemTestId = 'reviews-list-item';

  it('should correct render by authorized user', () => {
    const reviewsCount = 3;
    const propsMock = createPropsMock(reviewsCount);

    const { wrappedComponent } = withStore(
      <OfferReviews onReviewSubmit={propsMock.onReviewSubmit} reviews={propsMock.reviews} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock(),
          loading: false
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(reviewsCount)).toBeInTheDocument();
    expect(screen.getByTestId(reviewFormTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(reviewListItemTestId).length).toBe(reviewsCount);
  });

  it('should correct render by no authorized user', () => {
    const reviewsCount = 3;
    const propsMock = createPropsMock(reviewsCount);

    const { wrappedComponent } = withStore(
      <OfferReviews onReviewSubmit={propsMock.onReviewSubmit} reviews={propsMock.reviews} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.NoAuthorized,
          user: null,
          loading: false
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(reviewsCount)).toBeInTheDocument();
    expect(screen.queryByTestId(reviewFormTestId)).toBeNull();
    expect(screen.getAllByTestId(reviewListItemTestId).length).toBe(reviewsCount);
  });
});
