import type { Classed } from '../../types';

type LogoProps = Classed<{
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}>;

const DEFAULT_LOGO_PROPS: Required<LogoProps> = {
  alt: '6 cities logo',
  height: 41,
  width: 81,
  src: 'img/logo.svg',
  className: 'header__logo'
};

export function Logo(props: LogoProps): JSX.Element {
  const initializedProps: Required<LogoProps> = { ...DEFAULT_LOGO_PROPS, ...props };
  return (
    <div className="header__left">
      <a className="header__logo-link" href="main.html">
        <img
          className={initializedProps.className}
          src={initializedProps.src}
          alt={initializedProps.alt}
          width={initializedProps.width}
          height={initializedProps.height}
        />
      </a>
    </div>
  );
}
