import type { ComponentProps, PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';
//import Logo from '@shared/ui/logo';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';

type HeaderProps = Classed<PropsWithChildren>;

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

export function Header({ className, children }: HeaderProps): JSX.Element {
  const headerClassName = classNames('header', {
    [className ?? '']: !!className
  });
  return (
    <header className={headerClassName}>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <ImagedLink {...DEFAULT_LINK_PROPS} />
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}
