import type { PropsWithChildren } from 'react';
import { Classed } from '@shared/types';
import classNames from 'classnames';
import { Logo } from '../logo';
import { UserNavigationList } from '../user-navigation-list';

type HeaderProps = Classed<PropsWithChildren & {
  showUserNavigation?: boolean;
}>;

export function Header({ className, children, showUserNavigation = true }: HeaderProps): JSX.Element {
  const headerClassName = classNames('header', {
    [className ?? '']: !!className
  });

  return (
    <header className={headerClassName} data-testid='page-layout-header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          {showUserNavigation &&
            <nav className='header__nav'>
              <UserNavigationList />
            </nav>}
          {children}
        </div>
      </div>
    </header>
  );
}
