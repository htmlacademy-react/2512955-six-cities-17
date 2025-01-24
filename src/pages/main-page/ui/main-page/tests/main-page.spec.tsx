import { MainPage } from '../main-page';
import { withStore } from '@test-utills/hocs';
import { render } from '@testing-library/react';
import { createUserMock } from '@test-utills/mock/user';
import { AuthorizationStatusEnum } from '@shared/types';
import { OfferSortType } from '@features/offer-sorting-select';
import { createOffersMockByLocation } from '@test-utills/mock/offer';
import { OfferCityName } from '@entities/offer';
import { createMemoryHistory } from 'history';

describe('Component MainPage', () => {
  const headerTestId = 'page-layout-header';
  const contentTestId = 'page-layout-content';
  const filterContainerTestId = 'main-page-filter-container';

  it('should correct render', async () => {
    vi.spyOn(await import('react-router-dom'), 'useSearchParams').mockImplementation(
      vi.fn().mockImplementation(() => [new URLSearchParams(), vi.fn()])
    );
    const offersCount = 2;
    const activeLocation: OfferCityName = 'Amsterdam';
    const { wrappedComponent } = withStore(
      <MainPage />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock(),
          loading: false,
        },
        offersList: {
          error: null,
          offers: createOffersMockByLocation(activeLocation, offersCount),
          loading: false,
        },
        favoritesOffers: {
          error: null,
          offers: [],
          loading: false,
        },
        activeLocation: {
          location: activeLocation
        },
        activeSorting: {
          priceSorting: OfferSortType.DecreasePrice
        },
        loading: {
          loading: false
        }
      },
      [],
      createMemoryHistory()
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(filterContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(/^cities/i)).toBeInTheDocument();
    expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
  });
});
