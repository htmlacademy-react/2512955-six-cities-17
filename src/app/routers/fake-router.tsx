import type { FC } from 'react';
import { useState } from 'react';

import { OFFERS_INFO_MOCK } from '@app/mock/offers-mock';

import LoginPage from '@pages/login-page';
import MainPage from '@pages/main-page';
import FavoritesPage from '@pages/favorites-page';
import MainEmptyPage from '@pages/main-empty-page';
import NotLoggedOfferPage from '@pages/offer-not-logged-page';
import OfferPage from '@pages/offer-page';

enum RoutesEnum {
  Login = 'login',
  Favorites = 'favorites',
  EmptyFavorites = 'empty-favorites',
  Main = 'main',
  EmptyMain = 'empty-main',
  Offer = 'offer',
  NotLoggedOffer = 'not-logged-offer'
}

type NavLinkProps = {
  route: RoutesEnum;
  onClick: (route: RoutesEnum) => void;
  isActive: boolean;
}

const SUPPORTED_ROUTES = [
  RoutesEnum.Login,
  RoutesEnum.Main,
  RoutesEnum.Favorites,
  RoutesEnum.Offer,
  RoutesEnum.EmptyFavorites,
  RoutesEnum.EmptyMain,
  RoutesEnum.NotLoggedOffer
];

const routeToPageMap = new Map<RoutesEnum, FC>([
  [RoutesEnum.Login, LoginPage],
  [RoutesEnum.Main, () => <MainPage offers={OFFERS_INFO_MOCK}/>],
  [RoutesEnum.Favorites, () => <FavoritesPage offers={OFFERS_INFO_MOCK}/>],
  [RoutesEnum.EmptyFavorites, () => <FavoritesPage offers={[]} />],
  [RoutesEnum.EmptyMain, MainEmptyPage],
  [RoutesEnum.NotLoggedOffer, NotLoggedOfferPage],
  [RoutesEnum.Offer, OfferPage]
]);

function NavLink({ onClick, route, isActive }: NavLinkProps): JSX.Element {
  const linkClickHandler = (): void => {
    onClick(route);
  };

  return (
    <button
      style={{ margin: '5px' }}
      disabled={isActive}
      onClick={linkClickHandler}
    >
      {route}
    </button>
  );
}

export function FakeRouterProvider(): JSX.Element {
  const [activeRoute, setActiveRoute] = useState(RoutesEnum.Main);
  const Page = routeToPageMap.get(activeRoute);
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'center' }}>
        {SUPPORTED_ROUTES.map((current) =>
          (
            <NavLink
              key={`fake-route-${current}`}
              onClick={setActiveRoute}
              route={current}
              isActive={activeRoute === current}
            />
          )
        )}
      </nav>
      {Page && <Page />}
    </>

  );
}
