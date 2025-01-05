import type { ComponentProps, MouseEventHandler, PropsWithChildren } from 'react';
import { AuthorizationStatusEnum, Classed } from '@shared/types';
import classNames from 'classnames';
//import Logo from '@shared/ui/logo';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';
import { useAuthorization, UserInfo } from '@entities/user';

/**
 * @todo УДАЛИТЬ ЭТОТ ИМПОРТ КАК БУДЕТ ГОТОВ СЛАЙС С ИЗБРАННЫМ
 */
import { OFFERS_INFO_MOCK } from '@app/mock/offers-mock';
import { Link } from 'react-router-dom';

type HeaderProps = Classed<PropsWithChildren & {
  showUserNavigation?: boolean;
}>;

const DEFAULT_LINK_PROPS: ComponentProps<typeof ImagedLink> = {
  linkConfig: {
    to: RoutesEnum.Main,
    className: 'header__logo',
  },
  className: 'header__logo',
  src: 'img/logo.svg',
  width: 81,
  height: 41,
  alt: '6 cities logo'
};

export function Header({ className, children, showUserNavigation = true }: HeaderProps): JSX.Element {
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
          <div className='header__left'>
            <ImagedLink {...DEFAULT_LINK_PROPS} />
          </div>
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
                        favoritesCount={OFFERS_INFO_MOCK.length}
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
