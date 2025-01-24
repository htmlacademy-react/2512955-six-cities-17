import { NearOffersSection } from '../near-offers-section';
import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/hocs';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';

describe('Component NearOffersSection', () => {
  const sectionHeader = 'Other places in the neighbourhood';
  const offersListTestId = 'offer-list-container';
  const onFavoriteButtonCliclMock = vi.fn();

  it('should correct render by near offers exists', async () => {
    const nearOffers = [createMainOfferInfoMock()];
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useNearOffersData')
      .mockImplementation(() => nearOffers);
    const component = withRouter(
      <NearOffersSection onFavoriteButtonClick={onFavoriteButtonCliclMock}/>
    );

    const screen = render(component);

    expect(screen.getByText(sectionHeader)).toBeInTheDocument();
    expect(screen.getByTestId(offersListTestId)).toBeInTheDocument();
  });

  it('should correct render by near offers not exists', async () => {
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useNearOffersData')
      .mockImplementation(() => []);
    const component = withRouter(
      <NearOffersSection onFavoriteButtonClick={onFavoriteButtonCliclMock}/>
    );

    const screen = render(component);

    expect(screen.queryByText(sectionHeader)).toBeNull();
    expect(screen.queryByTestId(offersListTestId)).toBeNull();
  });
});
