import type { PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';
import ImagedLink from '@shared/ui/imaged-link';
import { DEFAULT_LINK_PROPS } from './const';

type FooterProps = Classed<PropsWithChildren>;

export function Footer({ className, children }: FooterProps): JSX.Element {
  const headerClassName = classNames('footer', {
    [className ?? '']: !!className
  });
  return (
    <footer className={headerClassName} data-testid='page-layout-footer'>
      <ImagedLink {...DEFAULT_LINK_PROPS} />
      {children}
    </footer>
  );
}
