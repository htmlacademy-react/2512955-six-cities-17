import { RoutesEnum } from '@shared/types';
import ImagedLink from '@shared/ui/imaged-link';
import { ComponentProps } from 'react';

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

export function Logo(): JSX.Element {
  return (
    <div className='header__left'>
      <ImagedLink {...DEFAULT_LINK_PROPS} />
    </div>
  );
}
