import type { PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';
import Logo from '@shared/ui/logo';

type HeaderProps = Classed<PropsWithChildren>;

export function Header({ className, children }: HeaderProps): JSX.Element {
  const headerClassName = classNames('header', {
    [className ?? '']: !!className
  });
  return (
    <header className={headerClassName}>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          {children}
        </div>
      </div>
    </header>
  );
}
