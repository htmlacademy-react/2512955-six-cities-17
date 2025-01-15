import { favoritesOffersSelector, fetchFavoritesOffersList } from '@entities/offer/model/favirites-offers-slice';
import { useOffers } from '../use-offers';

type FavoritesOffersSelectorReturn = ReturnType<typeof favoritesOffersSelector>;

type UseFavoritesOffersReturn = {
  favoritesOffers: FavoritesOffersSelectorReturn['value'];
  loading: FavoritesOffersSelectorReturn['loading'];
  error: FavoritesOffersSelectorReturn['error'];
  fetchFavoritesOffers: () => void;
}

export function useFavoritesOffers(): UseFavoritesOffersReturn {
  const {
    error,
    getOffers,
    loading,
    offers
  } = useOffers(favoritesOffersSelector, fetchFavoritesOffersList);

  return {
    error,
    loading,
    favoritesOffers: offers,
    fetchFavoritesOffers: getOffers
  };
}
