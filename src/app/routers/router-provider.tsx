import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { HistoryRouter, browserHistory } from './history-router';
import MainPage from '@pages/main-page';
import LoginPage from '@pages/login-page';
import FavoritesPage from '@pages/favorites-page';
import OfferPage from '@pages/offer-page';
import NotFoundPage from '@pages/not-found-page';
import { useAuthorization } from '@entities/user';
import { MainOfferInfo } from '@entities/offer';

type RouterProviderProps = {
  allOffers: MainOfferInfo[];
  favoritesOffers: MainOfferInfo[];
}

export function RouterProvider({ allOffers, favoritesOffers }: RouterProviderProps): JSX.Element {
  const { authorizationStatus } = useAuthorization();
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={RoutesEnum.Main}
          element={<MainPage offers={allOffers} favoritesCount={favoritesOffers.length} />}
        />
        <Route
          path={RoutesEnum.Login}
          element={
            <PrivateRoute isPrivate={authorizationStatus !== AuthorizationStatusEnum.Authorized} redirectPath={RoutesEnum.Main}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={RoutesEnum.Favorites}
          element={
            <PrivateRoute isPrivate={authorizationStatus === AuthorizationStatusEnum.Authorized} redirectPath={RoutesEnum.Login}>
              <FavoritesPage offers={favoritesOffers} />
            </PrivateRoute>
          }
        />
        <Route
          path={RoutesEnum.Offer}
          element={<OfferPage favoritesCount={favoritesOffers.length} />}
        />
        <Route
          path={RoutesEnum.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}
