import { withStore } from '@test-utills/hocs';
import { NotFoundPage } from '../not-found-page';
import { createUserMock } from '@test-utills/mock/user';
import { AuthorizationStatusEnum } from '@shared/types';
import { createOffersMockByLocation } from '@test-utills/mock/offer';
import { OfferSortType } from '@features/offer-sorting-select';
import { OfferCityName } from '@entities/offer';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

describe('Component NotFoundPage', () => {
  const headerTestId = 'page-layout-header';
  const contentTestId = 'page-layout-content';
  const footerTestId = 'page-layout-footer';
  const activeLocation: OfferCityName = 'Amsterdam';
  const notFoundAlt = 'Not found icon';

  it('should correct render', () => {
    const { wrappedComponent } = withStore(
      <NotFoundPage />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock()
        },
        offersList: {
          error: null,
          offers: createOffersMockByLocation(activeLocation, 3)
        },
        favoritesOffers: {
          error: null,
          offers: []
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
    expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
    expect(screen.getByText('404 Page not found!')).toBeInTheDocument();
    expect(screen.getByAltText(notFoundAlt)).toBeInTheDocument();
  });
});
