import { useOffersListFetch } from './use-offers-list-fetch';
import { fetchFavoritesOffersList } from '@entities/offer/model/favirites-offers-slice';

export function useFavoritesOffersListFetch(): ReturnType<typeof useOffersListFetch> {
  const fetch = useOffersListFetch(fetchFavoritesOffersList);
  return fetch;
}
