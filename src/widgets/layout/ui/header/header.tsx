import type { MouseEventHandler, PropsWithChildren } from 'react';
import { AuthorizationStatusEnum, Classed } from '@shared/types';
import classNames from 'classnames';
import { Logo } from '../logo';
import { RoutesEnum } from '@shared/types';
import { useAuthorization, UserInfo } from '@entities/user';
import { Link } from 'react-router-dom';
import { useFavoritesOffers } from '@entities/offer';

type HeaderProps = Classed<PropsWithChildren & {
  showUserNavigation?: boolean;
}>;

export function Header({ className, children, showUserNavigation = true }: HeaderProps): JSX.Element {
  const { favoritesOffers } = useFavoritesOffers();
  const headerClassName = classNames('header', {
    [className ?? '']: !!className
  });

  const { user, authorizationStatus, logout } = useAuthorization();
  const isAuthorized = authorizationStatus === AuthorizationStatusEnum.Authorized;

  const signOutHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <header className={headerClassName}>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          {showUserNavigation &&
            <nav className='header__nav'>
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
            </nav>}
          {children}
        </div>
      </div>
    </header>
  );
}
