import { createReviewMock } from '@test-utills/mock/review';
import { render } from '@testing-library/react';
import { OfferReviewsSection } from '../offer-reviews-section';
import { AuthorizationStatusEnum } from '@shared/types';

describe('Component OfferReviewsSection', () => {
  const reviewsCount = 5;
  const reviewsMock = Array.from({length: reviewsCount}).map(() => createReviewMock());
  const reviewsComponentTestId = 'offers-reviews-section';

  it('should correct render if reviews exists', async () => {
    vi.spyOn(await import('@entities/user'),'useAuthorization')
      .mockImplementation(vi.fn(() => ({
        authorizationStatus: AuthorizationStatusEnum.Unknown,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      })));
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useOfferReviewsData')
      .mockImplementation(vi.fn(() => reviewsMock));

    const screen = render(
      <OfferReviewsSection onReviewSubmit={vi.fn()} />
    );

    expect(screen.getByTestId(reviewsComponentTestId)).toBeInTheDocument();
  });

  it('should correct render if reviews not exists', async () => {
    vi.spyOn(await import('@entities/user'),'useAuthorization')
      .mockImplementation(vi.fn(() => ({
        authorizationStatus: AuthorizationStatusEnum.Unknown,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      })));
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useOfferReviewsData')
      .mockImplementation(vi.fn(() => []));

    const screen = render(
      <OfferReviewsSection onReviewSubmit={vi.fn()} />
    );

    expect(screen.container.childNodes.length).toBe(0);
  });
});
