import type { PropsWithChildren, FC } from 'react';
import type { Classed } from '@shared/types';
import classNames from 'classnames';
import Header from './ui/header';
import Content from './ui/content';
import Footer from './ui/footer';

type LayoutProps = Classed<PropsWithChildren>;

type LayoutExtensions = {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
}

export const Layout: FC<LayoutProps> & LayoutExtensions = ({ className, children }: LayoutProps) => {
  const layoutClassName = classNames('page', {
    [(className ?? '')]: !!className
  });

  return (
    <div className={layoutClassName} data-testid='page-layout'>
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
