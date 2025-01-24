import { useFavoritesOffersListData } from '@entities/offer';
import { useAuthorization, UserInfo } from '@entities/user';
import { AuthorizationStatusEnum, RoutesEnum } from '@shared/types';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export function UserNavigationList(): JSX.Element {
  const { user, authorizationStatus, logout } = useAuthorization();
  const favoritesOffers = useFavoritesOffersListData();
  const signOutHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    logout();
  };

  const isAuthorized = authorizationStatus === AuthorizationStatusEnum.Authorized;

  return (
    <ul className='header__nav-list'>
      <li className='header__nav-item user'>
        <Link
          to={isAuthorized ? RoutesEnum.Favorites : RoutesEnum.Login}
          className='header__nav-link header__nav-link--profile'
        >
          <div className='header__avatar-wrapper user__avatar-wrapper'>
            {(user && isAuthorized) && <img src={user.avatarUrl} alt='Avatar' className='user__avatar' />}
          </div>
          {(user && isAuthorized) &&
            <UserInfo
              email={user.email}
              favoritesCount={favoritesOffers.length}
            />}
          {!isAuthorized && <span className='header__login'>Sign in</span>}
        </Link>
      </li>
      {isAuthorized &&
        <li className='header__nav-item'>
          <a className='header__nav-link' onClick={signOutHandler}>
            <span className='header__signout'>Sign out</span>
          </a>
        </li>}
    </ul>
  );
}
