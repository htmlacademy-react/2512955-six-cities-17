import { ElementSize, RoutesEnum } from '@shared/types';
import ImagedLink from '@shared/ui/imaged-link';
import classNames from 'classnames';
import { ComponentProps } from 'react';

type LogoType = 'header' | 'footer';

type LogoProps = {
  type: LogoType;
  size: ElementSize;
}

const getLinkProps = (logoType: LogoType, size: ElementSize): ComponentProps<typeof ImagedLink> => {
  const linkClassName = classNames({
    'header__logo' : logoType === 'header',
    'footer__logo-link' : logoType === 'footer'
  });

  const imageClassName = classNames({
    'header__logo' : logoType === 'header',
    'footer__logo' : logoType === 'footer'
  });

  return {
    linkConfig: {
      to: RoutesEnum.Main,
      className: linkClassName,
    },
    className: imageClassName,
    src: 'img/logo.svg',
    width: size.width,
    height: size.height,
    alt: '6 cities logo'
  };
};

export function Logo({ size, type = 'header' }: LogoProps): JSX.Element {
  const linkProps = getLinkProps(type, size);

  return (
    <ImagedLink {...linkProps} />
  );
}
