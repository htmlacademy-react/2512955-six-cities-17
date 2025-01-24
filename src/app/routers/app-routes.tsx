import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import MainPage from '@pages/main-page';
import LoginPage from '@pages/login-page';
import FavoritesPage from '@pages/favorites-page';
import OfferPage from '@pages/offer-page';
import NotFoundPage from '@pages/not-found-page';

type AppRoutesProps = {
  authorizationStatus: AuthorizationStatusEnum;
}

export function AppRoutes({authorizationStatus}: AppRoutesProps): JSX.Element {
  return (
    <Routes>
      <Route
        path={RoutesEnum.Main}
        element={<MainPage />}
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
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={RoutesEnum.Offer}
        element={<OfferPage />}
      />
      <Route
        path={RoutesEnum.NotFound}
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
