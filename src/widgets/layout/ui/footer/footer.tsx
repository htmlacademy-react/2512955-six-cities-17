import type { PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';

type FooterProps = Classed<PropsWithChildren>;

export function Footer({ className, children }: FooterProps): JSX.Element {
  const headerClassName = classNames('footer', {
    [className ?? '']: !!className
  });
  return (
    <header className={headerClassName}>
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </a>
      {children}
    </header>
  );
}
