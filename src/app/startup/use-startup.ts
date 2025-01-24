import { useFavoritesOffersListFetch, useMainOffersListFetch } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { useGlobalLoader } from '@shared/hooks/use-global-loader';
import { AuthorizationStatusEnum } from '@shared/types';
import { useEffect } from 'react';

export function useStartup() {
  const setLoading = useGlobalLoader();
  const { checkAuthorization, authorizationStatus } = useAuthorization();
  const fetchMainOffers = useMainOffersListFetch();
  const fetchFavoritesOffers = useFavoritesOffersListFetch();

  useEffect(
    () => {
      let componentIsRendered = false;

      const runAuthorizationCheck = async () => {
        if (!componentIsRendered) {
          setLoading(true);
          await checkAuthorization();
          setLoading(false);
        }
      };

      runAuthorizationCheck();

      return () => {
        componentIsRendered = true;
      };
    },
    [checkAuthorization, setLoading]
  );

  useEffect(
    () => {
      let componentIsRendered = false;

      const fetchOffersData = async () => {
        if (!componentIsRendered) {
          setLoading(true);
          await Promise.all([
            authorizationStatus !== AuthorizationStatusEnum.Unknown ? fetchMainOffers() : Promise.resolve(),
            authorizationStatus === AuthorizationStatusEnum.Authorized ? fetchFavoritesOffers() : Promise.resolve()
          ]);
          setLoading(false);
        }
      };

      fetchOffersData();

      return () => {
        componentIsRendered = true;
      };
    },
    [authorizationStatus, fetchFavoritesOffers, fetchMainOffers, setLoading]
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
