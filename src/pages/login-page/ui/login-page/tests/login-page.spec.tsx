import { AuthorizationStatusEnum } from '@shared/types';
import { LoginPage } from '../login-page';
import { withStore } from '@test-utills/hocs';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { OfferCityName } from '@entities/offer';

describe('Component LoginPage', () => {
  const headerTestId = 'page-layout-header';
  const contentTestId = 'page-layout-content';
  const loginFormTestId = 'login-form-element';
  const activeLocation: OfferCityName = 'Amsterdam';

  it('should correct render', () => {
    const { wrappedComponent } = withStore(
      <LoginPage />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Unknown,
          user: null,
          loading: false,
        },
        favoritesOffers: {
          error: null,
          offers: [],
          loading: false,
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
    expect(screen.getByText(/^sign in/i, {
      selector: 'h1'
    })).toBeInTheDocument();
    expect(screen.getByTestId(loginFormTestId)).toBeInTheDocument();
    expect(screen.getByText(activeLocation)).toBeInTheDocument();
  });
});
