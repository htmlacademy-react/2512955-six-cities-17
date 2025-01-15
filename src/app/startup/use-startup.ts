import { useFavoritesOffers, useOffersList } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { AuthorizationStatusEnum } from '@shared/types';
import { useEffect } from 'react';

export function useStartup() {
  const { setLoading } = useGlobalLoader();
  const { fetchList, loading } = useOffersList();
  const { loading: favoritesLoading, fetchFavoritesOffers } = useFavoritesOffers();
  const { loading: authorizationQueryLoading, checkAuthorization, authorizationStatus } = useAuthorization();

  useEffect(
    () => {
      let componentIsRendered = false;
      if (!componentIsRendered) {
        setLoading(loading || authorizationQueryLoading || favoritesLoading);
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [loading, authorizationQueryLoading, setLoading, favoritesLoading]
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

  useEffect(
    () => {
      let componentIsRendered = false;

      if (!componentIsRendered && authorizationStatus === AuthorizationStatusEnum.Authorized) {
        fetchFavoritesOffers();
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [authorizationStatus, fetchFavoritesOffers]
  );
}
