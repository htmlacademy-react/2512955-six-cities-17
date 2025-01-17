import { useAppSelector } from '@shared/lib/store';
import { favoritesOffersSelector } from '@entities/offer/model/favirites-offers-slice';
import { MainOfferInfo } from '@entities/offer/model/types';

export function useFavoritesOffersListData(): MainOfferInfo[] {
  const offers = useAppSelector(favoritesOffersSelector);
  return offers;
}
