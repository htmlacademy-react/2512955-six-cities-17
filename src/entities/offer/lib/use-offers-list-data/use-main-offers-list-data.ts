import { useAppSelector } from '@shared/lib/store';
import { offersListSelector } from '@entities/offer/model/offer-info-slice';
import { MainOfferInfo } from '@entities/offer/model/types';

export function useMainOffersListData(): MainOfferInfo[] {
  const offers = useAppSelector(offersListSelector);
  return offers;
}
