import { useAuthorization } from '@entities/user/lib/useAuthorization';
import { AuthorizationStatusEnum, Classed, RoutesEnum } from '@shared/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';

type UserInfoProps = Classed<{
  favoritesCount?: number;
}>;

/**
 * @todo Доделать как появится авторизация
 * 1) Допроставить ссылки и обработчики
 * 2) Выяснить как тут редиректить нормально на логин
 */
export function UserInfo({ favoritesCount = 0, className }: UserInfoProps): JSX.Element {
  const containerClassName = classNames('header__nav', className);
  const { authorizationStatus, user, logout } = useAuthorization();

  const isAuthorized = authorizationStatus === AuthorizationStatusEnum.Authorized;

  const signOutHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <nav className={containerClassName}>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link
            to={isAuthorized ? RoutesEnum.Favorites : RoutesEnum.Login}
            className='header__nav-link header__nav-link--profile'
          >
            <div className='header__avatar-wrapper user__avatar-wrapper'>
              {isAuthorized && <img src={user?.avatarUrl} alt='Avatar' className='user__avatar' />}
            </div>
            {isAuthorized
              ?
              <>
                <span className='header__user-name user__name'>{user?.email}</span>
                <span className='header__favorite-count'>{favoritesCount}</span>
              </>
              :
              <span className='header__login'>Sign in</span>}
          </Link>
        </li>
        {isAuthorized &&
          <li className='header__nav-item'>
            <a className='header__nav-link' onClick={signOutHandler}>
              <span className='header__signout'>Sign out</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}
