import { offersListSelector, fetchOffersList } from '@entities/offer/model/offer-info-slice';
import { useOffers } from '../use-offers';

type OffersListSelectorReturn = ReturnType<typeof offersListSelector>;

type UseOffersListReturn = {
  offersList: OffersListSelectorReturn['value'];
  loading: OffersListSelectorReturn['loading'];
  error: OffersListSelectorReturn['error'];
  fetchList: () => void;
}

export function useOffersList(): UseOffersListReturn {
  const {
    error,
    getOffers,
    loading,
    offers
  } = useOffers(offersListSelector, fetchOffersList);

  return {
    error,
    loading,
    offersList: offers,
    fetchList: getOffers
  };
}
