import { ComponentProps } from 'react';
import ImagedLink from '@shared/ui/imaged-link';
import { RoutesEnum } from '@shared/types';

export const DEFAULT_LINK_PROPS: ComponentProps<typeof ImagedLink> = {
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
