import { AuthorizationStatusEnum } from '@shared/types';
import { FavoritesPage } from '../favorites-page';
import { withStore } from '@test-utills/hocs';
import { render } from '@testing-library/react';
import { createUserMock } from '@test-utills/mock/user';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { createMemoryHistory } from 'history';

describe('Component FavoritesPage', () => {
  it('should correct render', () => {
    const headerTestId = 'page-layout-header';
    const contentTestId = 'favorites-page-content';
    const footerTestId = 'page-layout-footer';
    const { wrappedComponent } = withStore(
      <FavoritesPage />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock(),
          loading: false,
        },
        favoritesOffers: {
          error: null,
          offers: Array.from({ length: 3 }).map(() => createMainOfferInfoMock()),
          loading: false,
        }
      },
      [],
      createMemoryHistory()
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
