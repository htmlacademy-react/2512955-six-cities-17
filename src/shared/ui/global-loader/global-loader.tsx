import { useAppSelector } from '@shared/lib/store';
import { getLoaderSelector } from '@shared/model/global-loader-slice';
import { Spinner } from '@shared/ui/spinner';
import classNames from 'classnames';
import { ReactNode } from 'react';

type GlobalLoaderProps = {
  className?: string;
}

export function GlobalLoader({className}: GlobalLoaderProps): ReactNode {
  const loading = useAppSelector(getLoaderSelector);
  const loaderClassName = classNames(
    'loader-container',
    {
      'loader-container--active': loading,
    },
    className
  );
  return (
    <div className={loaderClassName}>
      <Spinner isActive={loading} />
    </div>
  );
}
