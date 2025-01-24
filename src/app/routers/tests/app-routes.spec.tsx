import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoutes } from '../app-routes';
import { withRouter } from '@test-utills/hocs';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { render } from '@testing-library/react';
import faker from 'faker';
import { generatePath } from 'react-router-dom';

vi.mock('@pages/main-page', () => ({
  default: () => <p>Main page text</p>
}));
vi.mock('@pages/login-page', () => ({
  default: () => <p>Login page text</p>
}));
vi.mock('@pages/favorites-page', () => ({
  default: () => <p>Favorites page text</p>
}));
vi.mock('@pages/not-found-page', () => ({
  default: () => <p>Not found page text</p>
}));
vi.mock('@pages/offer-page', () => ({
  default: () => <p>Offer page text</p>
}));

const MAIN_PAGE_TEXT = 'Main page text';
const LOGIN_PAGE_TEXT = 'Login page text';
const FAVORITES_PAGE_TEXT = 'Favorites page text';
const OFFER_PAGE_TEXT = 'Offer page text';
const NOT_FOUND_PAGE_TEXT = 'Not found page text';

describe('Routes', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  describe('for authorized user', () => {
    const authorizationStatus = AuthorizationStatusEnum.Authorized;

    it('should navigate on MainPage by Routes.Main', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(RoutesEnum.Main);
      screen.rerender(component);

      expect(screen.getByText(MAIN_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on MainPage by Routes.Login', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(RoutesEnum.Login);
      screen.rerender(component);

      expect(screen.getByText(MAIN_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on FavoritesPage by Routes.Favorites', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);
      const screen = render(component);

      history.replace(RoutesEnum.Favorites);
      screen.rerender(component);

      expect(screen.getByText(FAVORITES_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on OfferPage by Routes.Offer', () => {
      const pageUrl = generatePath(RoutesEnum.Offer, { id: faker.datatype.uuid() });
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(pageUrl);
      screen.rerender(component);

      expect(screen.getByText(OFFER_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on NotFoundPage by not defined Route', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push('/not-defined');
      screen.rerender(component);

      expect(screen.getByText(NOT_FOUND_PAGE_TEXT)).toBeInTheDocument();
    });
  });

  describe('for unauthorized user', () => {
    const authorizationStatus = AuthorizationStatusEnum.NoAuthorized;

    it('should navigate on MainPage by Routes.Main', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(RoutesEnum.Main);
      screen.rerender(component);

      expect(screen.getByText(MAIN_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on MainPage by Routes.Login', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(RoutesEnum.Login);
      screen.rerender(component);

      expect(screen.getByText(LOGIN_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on FavoritesPage by Routes.Favorites', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);
      const screen = render(component);

      history.replace(RoutesEnum.Favorites);
      screen.rerender(component);

      expect(screen.getByText(LOGIN_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on OfferPage by Routes.Offer', () => {
      const pageUrl = generatePath(RoutesEnum.Offer, { id: faker.datatype.uuid() });
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push(pageUrl);
      screen.rerender(component);

      expect(screen.getByText(OFFER_PAGE_TEXT)).toBeInTheDocument();
    });

    it('should navigate on NotFoundPage by not defined Route', () => {
      const component = withRouter(<AppRoutes authorizationStatus={authorizationStatus} />, history);

      const screen = render(component);
      history.push('/not-defined');
      screen.rerender(component);

      expect(screen.getByText(NOT_FOUND_PAGE_TEXT)).toBeInTheDocument();
    });
  });
});
