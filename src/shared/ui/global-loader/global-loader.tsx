import { RootState, useAppSelector } from '@shared/lib/store';
import { getLoaderSelector } from '@shared/model/global-loader-slice';
import { Spinner } from '@shared/ui/spinner';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Selector = (state: RootState) => boolean;

type GlobalLoaderProps = {
  className?: string;
  offerPageLoadingSelector: Selector;
  mainOffersLoadingSelector: Selector;
  favoritesOffersLoadingSelector: Selector;
  authorizationLoadingSelector: Selector;
}

export function GlobalLoader({
  className,
  authorizationLoadingSelector,
  favoritesOffersLoadingSelector,
  mainOffersLoadingSelector,
  offerPageLoadingSelector
}: GlobalLoaderProps): ReactNode {
  const innerLoading = useAppSelector(getLoaderSelector);
  const authLoading = useAppSelector(authorizationLoadingSelector);
  const favoritesLoading = useAppSelector(favoritesOffersLoadingSelector);
  const mainLoading = useAppSelector(mainOffersLoadingSelector);
  const offerPageLoading = useAppSelector(offerPageLoadingSelector);

  const loading = innerLoading || authLoading || favoritesLoading || mainLoading || offerPageLoading;

  const loaderClassName = classNames(
    'loader-container',
    {
      'loader-container--active': loading,
    },
    className
  );
  return (
    <div className={loaderClassName} data-testid='global-loader-container'>
      <Spinner isActive={loading} />
    </div>
  );
}
