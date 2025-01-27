import type { PropsWithChildren } from 'react';
import { Classed, ElementSize } from '@shared/types';
import classNames from 'classnames';
import { Logo } from '../logo';
import { UserNavigationList } from '../user-navigation-list';

type HeaderProps = Classed<PropsWithChildren & {
  showUserNavigation?: boolean;
}>;

const LOGO_SIZE: ElementSize = {
  width: 81,
  height: 41
};

export function Header({ className, children, showUserNavigation = true }: HeaderProps): JSX.Element {
  const headerClassName = classNames('header', {
    [className ?? '']: !!className
  });

  return (
    <header className={headerClassName} data-testid='page-layout-header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo size={LOGO_SIZE} type='header' />
          </div>
          {showUserNavigation &&
            <nav className='header__nav' data-testid='header-user-navigation'>
              <UserNavigationList />
            </nav>}
          {children}
        </div>
      </div>
    </header>
  );
}
