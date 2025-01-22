import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import type { Classed } from '@shared/types';

type ContentProps = Classed<PropsWithChildren>;

export function Content({ children, className }: ContentProps): JSX.Element {
  const contentClassName = classNames('page__main', {
    [className ?? '']: !!className
  });

  return (
    <main className={contentClassName} data-testid='page-layout-content'>
      {children}
    </main>
  );
}
