import { withRouter } from '@test-utills/hocs';
import { FavoritesPageContent } from '../favorites-page-content';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';

vi.mock('@features/add-offer-to-favorites');

describe('Component FavoritesPageContent', () => {
  const offerListTestId = 'favorites-offers-list';
  const emptyListTestId = 'favorites-list-empty-text';

  it('should correct render with offers exists', async () => {
    const offersMock = Array.from({length: 10}).map(() => createMainOfferInfoMock());
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(vi.fn(() => offersMock));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
      .mockImplementation(vi.fn(() => vi.fn()));
    const component = withRouter(<FavoritesPageContent />);

    const screen = render(component);

    expect(screen.getByText(/^saved listing/i)).toBeInTheDocument();
    expect(screen.getByTestId(offerListTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(emptyListTestId)).toBeNull();
  });

  it('should correct render with offers not exists', async () => {
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(vi.fn(() => []));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
      .mockImplementation(vi.fn(() => vi.fn()));
    const component = withRouter(<FavoritesPageContent />);

    const screen = render(component);

    expect(screen.queryByText(/^saved listing/i)).toBeNull();
    expect(screen.queryByTestId(offerListTestId)).toBeNull();
    expect(screen.getByTestId(emptyListTestId)).toBeInTheDocument();
  });
});
