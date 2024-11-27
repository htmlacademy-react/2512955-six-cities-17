import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OFFERS_INFO_MOCK } from '@app/mock/offers-mock';
import { RequireAuth } from './require-auth';
import { NoAuthRoute } from './no-auth-route';
import { NotExistsRouteNavigate } from './not-exists-route-navigate';
import { RoutesEnum } from '@shared/types';

import MainPage from '@pages/main-page';
import LoginPage from '@pages/login-page';
import FavoritesPage from '@pages/favorites-page';
import OfferPage from '@pages/offer-page';

export function RouterProvider(): JSX.Element {
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
            <NoAuthRoute redirectPath={RoutesEnum.Main}>
              <Route path={RoutesEnum.Login} element={<LoginPage />}/>
            </NoAuthRoute>
          }
        />
        <Route
          path={RoutesEnum.Favorites}
          element={
            <RequireAuth redirectPath={RoutesEnum.Login}>
              <FavoritesPage offers={OFFERS_INFO_MOCK} />
            </RequireAuth>
          }
        />
        <Route
          path={RoutesEnum.Offer}
          element={<OfferPage />}
        />
        <Route
          path='*'
          element={<NotExistsRouteNavigate authRedirect={RoutesEnum.Main} noAuthRedirect={RoutesEnum.Login}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
