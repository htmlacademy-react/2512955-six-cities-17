import type { ComponentProps, PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';

type FooterProps = Classed<PropsWithChildren>;

const DEFAULT_LINK_PROPS: ComponentProps<typeof ImagedLink> = {
  linkConfig: {
    to: RoutesEnum.Main,
    className: 'footer__logo-link'
  },
  className: 'footer__logo',
  alt: '6 cities logo',
  width: 64,
  height: 33,
  src: 'img/logo.svg'
};

export function Footer({ className, children }: FooterProps): JSX.Element {
  const headerClassName = classNames('footer', {
    [className ?? '']: !!className
  });
  return (
    <footer className={headerClassName}>
      <ImagedLink {...DEFAULT_LINK_PROPS} />
      {children}
    </footer>
  );
}
