import { AuthorizationStatusEnum } from '@shared/types';
import { UserNavigationList } from '../user-navigation-list';
import { withStore } from '@test-utills/hocs';
import { createUserMock } from '@test-utills/mock/user';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';

describe('Component UserNavigationList', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should correct render with authorized user', () => {
    const userMock = createUserMock();
    const favoritesOffersCount = 1;
    const { wrappedComponent } = withStore(
      <UserNavigationList />,
      {
        authorization: {
          status: AuthorizationStatusEnum.Authorized,
          user: userMock,
          error: null,
          loading: false,
        },
        favoritesOffers: {
          offers: [createMainOfferInfoMock()],
          error: null,
          loading: false,
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByAltText(/^avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/^sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/^sign in/i)).toBeNull();
    expect(screen.getByText(userMock.email)).toBeInTheDocument();
    expect(screen.getByText(favoritesOffersCount)).toBeInTheDocument();
  });

  it('should correct render with no authorized user', () => {
    const userMock = createUserMock();
    const favoritesOffersCount = 0;
    const { wrappedComponent } = withStore(
      <UserNavigationList />,
      {
        authorization: {
          status: AuthorizationStatusEnum.NoAuthorized,
          user: null,
          error: null,
          loading: false,
        },
        favoritesOffers: {
          offers: [],
          error: null,
          loading: false,
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByAltText(/^avatar/i)).toBeNull();
    expect(screen.getByText(/^sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/^sign out/i)).toBeNull();
    expect(screen.queryByText(userMock.email)).toBeNull();
    expect(screen.queryByText(favoritesOffersCount)).toBeNull();
  });
});
