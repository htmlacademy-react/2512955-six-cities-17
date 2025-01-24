import { useAppSelector } from '@shared/lib/store';
import { offerNearsSelector } from '@pages/offer-page/model/offer-page-slice';
import { MainOfferInfo } from '@entities/offer';

export function useNearOffersData(): MainOfferInfo[] {
  const nearOffers = useAppSelector(offerNearsSelector);
  return nearOffers;
}
