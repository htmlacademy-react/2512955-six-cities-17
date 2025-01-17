import { useOffersListFetch } from './use-offers-list-fetch';
import { fetchOffersList } from '@entities/offer/model/offer-info-slice';

export function useMainOffersListFetch(): ReturnType<typeof useOffersListFetch> {
  const fetch = useOffersListFetch(fetchOffersList);
  return fetch;
}
