import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OFFERS_INFO_MOCK } from '@app/mock/offers-mock';
import { PrivateRoute } from './private-route';
import { NotExistsRouteNavigate } from './not-exists-route-navigate';
import { RoutesEnum } from '@shared/types';

import MainPage from '@pages/main-page';
import LoginPage from '@pages/login-page';
import FavoritesPage from '@pages/favorites-page';
import OfferPage from '@pages/offer-page';
import { useAuthorization } from '@entities/user';

export function RouterProvider(): JSX.Element {
  const { isAuthorized } = useAuthorization();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RoutesEnum.Main}
          element={<MainPage offers={OFFERS_INFO_MOCK} />}
        />
        <Route
          path={RoutesEnum.Login}
          element={
            <PrivateRoute isPrivate={!isAuthorized} redirectPath={RoutesEnum.Main}>
              <Route path={RoutesEnum.Login} element={<LoginPage />}/>
            </PrivateRoute>
          }
        />
        <Route
          path={RoutesEnum.Favorites}
          element={
            <PrivateRoute isPrivate={isAuthorized} redirectPath={RoutesEnum.Login}>
              <FavoritesPage offers={OFFERS_INFO_MOCK} />
            </PrivateRoute>
          }
        />
        <Route
          path={RoutesEnum.Offer}
          element={<OfferPage />}
        />
        <Route
          path={RoutesEnum.NotFound}
          element={<NotExistsRouteNavigate authRedirect={RoutesEnum.Main} noAuthRedirect={RoutesEnum.Login}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
