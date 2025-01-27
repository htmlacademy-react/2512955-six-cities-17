import type { PropsWithChildren } from 'react';
import type { Classed, ElementSize } from '@shared/types';
import classNames from 'classnames';
import { Logo } from '../logo';

type FooterProps = Classed<PropsWithChildren>;

const LOGO_SIZE: ElementSize = {
  width: 64,
  height: 33,
};

export function Footer({ className, children }: FooterProps): JSX.Element {
  const headerClassName = classNames('footer', {
    [className ?? '']: !!className
  });
  return (
    <footer className={headerClassName} data-testid='page-layout-footer'>
      <Logo size={LOGO_SIZE} type='footer' />
      {children}
    </footer>
  );
}
