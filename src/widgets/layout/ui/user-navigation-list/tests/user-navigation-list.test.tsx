import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { UserNavigationList } from '../user-navigation-list';
import { withRouter } from '@test-utills/hocs';
import { createUserMock } from '@test-utills/mock/user';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { MainOfferInfo } from '@entities/offer';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const USER_MOCK = createUserMock();
const INITIAL_ROUTE = '/initial-route';
const FAVORITES_OFFERS_MOCK = [createMainOfferInfoMock()];
const AVATAR_ALT_PATTERN = /^avatar/i;
const SIGN_OUT_TEXT_PATTERN = /^sign out/i;
const SIGN_IN_TEXT_PATTERN = /^sign in/i;
const FAKE_FAVORITES_PAGE_TEXT = 'Fake favorites page';
const FAKE_LOGIN_PAGE_TEXT = 'Fake login page';

const useFavoritesOffersListDataMock = vi.fn<[], MainOfferInfo[]>();
const logoutMock = vi.fn();

const fakeFavoritesPageElement = <p>{FAKE_FAVORITES_PAGE_TEXT}</p>;
const fakeLoginPageElement = <p>{FAKE_LOGIN_PAGE_TEXT}</p>;

describe('Component UserNavigationList', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
    useFavoritesOffersListDataMock.mockReset();
    useFavoritesOffersListDataMock.mockImplementation(() => []);
    logoutMock.mockReset();
  });

  it('should correct render with authorized user', async () => {
    useFavoritesOffersListDataMock.mockImplementationOnce(() => FAVORITES_OFFERS_MOCK);
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Authorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: USER_MOCK
      }));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(useFavoritesOffersListDataMock);

    const wrappedComponent = withRouter(
      <UserNavigationList />,
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByAltText(AVATAR_ALT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(SIGN_OUT_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.queryByText(SIGN_IN_TEXT_PATTERN)).toBeNull();
    expect(screen.getByText(USER_MOCK.email)).toBeInTheDocument();
    expect(screen.getByText(FAVORITES_OFFERS_MOCK.length)).toBeInTheDocument();
  });

  it('should correct render with no authorized user', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.NoAuthorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(useFavoritesOffersListDataMock);

    const wrappedComponent = withRouter(
      <UserNavigationList />,
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByAltText(AVATAR_ALT_PATTERN)).toBeNull();
    expect(screen.getByText(SIGN_IN_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.queryByText(SIGN_OUT_TEXT_PATTERN)).toBeNull();
    expect(screen.queryByText(USER_MOCK.email)).toBeNull();
    expect(screen.queryByText(0)).toBeNull();
  });

  it('should redirect on FavoritesPage for click by user email if user authorized', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Authorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: USER_MOCK
      }));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(useFavoritesOffersListDataMock);

    const wrappedComponent = withRouter(
      <Routes>
        <Route path={INITIAL_ROUTE} element={<UserNavigationList />} />
        <Route path={RoutesEnum.Favorites} element={fakeFavoritesPageElement} />
      </Routes>,
      history
    );

    const screen = render(wrappedComponent);
    await userEvent.click(screen.getByText(USER_MOCK.email));

    expect(screen.getByText(FAKE_FAVORITES_PAGE_TEXT)).toBeInTheDocument();
  });

  it('should call logout method from \'useAuthorization\' hook for click by \'Sign out\' link', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Authorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: logoutMock,
        user: USER_MOCK
      }));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(useFavoritesOffersListDataMock);

    const wrappedComponent = withRouter(
      <UserNavigationList />,
      history
    );

    const screen = render(wrappedComponent);
    await userEvent.click(screen.getByText(SIGN_OUT_TEXT_PATTERN));

    expect(logoutMock).toBeCalledTimes(1);
  });

  it('should redirect on LoginPage for click by \'Sign in\' link if user no authorized', async () => {
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.NoAuthorized,
        checkAuthorization: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListData')
      .mockImplementation(useFavoritesOffersListDataMock);

    const wrappedComponent = withRouter(
      <Routes>
        <Route path={INITIAL_ROUTE} element={<UserNavigationList />} />
        <Route path={RoutesEnum.Login} element={fakeLoginPageElement} />
      </Routes>,
      history
    );

    const screen = render(wrappedComponent);
    await userEvent.click(screen.getByText(SIGN_IN_TEXT_PATTERN));

    expect(screen.getByText(FAKE_LOGIN_PAGE_TEXT)).toBeInTheDocument();
  });
});
