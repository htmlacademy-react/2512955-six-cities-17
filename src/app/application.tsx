import RouterProvider from './routers';
import { GlobalLoader } from '@shared/ui/global-loader';
import { ToastContainer } from 'react-toastify';
import { TOAST_CONTAINER_ID } from './config';
import { useEffect } from 'react';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { useOffersList } from '@entities/offer';
import { OFFERS_INFO_MOCK } from './mock/offers-mock';
import { useAuthorization } from '@entities/user';

export function App(): JSX.Element {
  const { setLoading } = useGlobalLoader();
  const { fetchList, offersList, loading } = useOffersList();
  const { loading: authorizationQueryLoading, checkAuthorization } = useAuthorization();

  useEffect(
    () => {
      let componentIsRendered = false;
      if (!componentIsRendered) {
        setLoading(loading || authorizationQueryLoading);
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [loading, authorizationQueryLoading, setLoading]
  );

  useEffect(
    () => {
      let componentIsRendered = false;
      if (!componentIsRendered) {
        checkAuthorization();
        fetchList();
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [fetchList, checkAuthorization]
  );
  return (
    <>
      <GlobalLoader />
      <ToastContainer
        limit={1}
        autoClose={3000}
        theme='colored'
        position='bottom-center'
        containerId={TOAST_CONTAINER_ID}
      />
      <RouterProvider
        allOffers={offersList}
        favoritesOffers={OFFERS_INFO_MOCK}
      />
    </>
  );
}
