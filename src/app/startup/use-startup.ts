import { useFavoritesOffersListFetch, useMainOffersListFetch } from '@entities/offer';
import { useAuthorization } from '@entities/user';
import { AuthorizationStatusEnum } from '@shared/types';
import { useEffect } from 'react';

export function useStartup() {
  const { checkAuthorization, authorizationStatus } = useAuthorization();
  const fetchMainOffers = useMainOffersListFetch();
  const fetchFavoritesOffers = useFavoritesOffersListFetch();

  useEffect(
    () => {
      let componentIsRendered = false;

      const runAuthorizationCheck = async () => {
        if (!componentIsRendered) {
          await checkAuthorization();
        }
      };

      runAuthorizationCheck();

      return () => {
        componentIsRendered = true;
      };
    },
    [checkAuthorization]
  );

  useEffect(
    () => {
      let componentIsRendered = false;

      const fetchOffersData = async () => {
        if (!componentIsRendered) {
          await Promise.all([
            authorizationStatus !== AuthorizationStatusEnum.Unknown ? fetchMainOffers() : Promise.resolve(),
            authorizationStatus === AuthorizationStatusEnum.Authorized ? fetchFavoritesOffers() : Promise.resolve()
          ]);
        }
      };

      fetchOffersData();

      return () => {
        componentIsRendered = true;
      };
    },
    [authorizationStatus, fetchFavoritesOffers, fetchMainOffers]
  );
}
