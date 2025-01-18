import { useAppSelector } from '@shared/lib/store';
import { offerDataSelector } from '@pages/offer-page/model/offer-page-slice';
import { Nullable } from '@shared/types';
import { FullOfferInfo } from '@entities/offer';

export function useOfferInfoData(): Nullable<FullOfferInfo> {
  const offer = useAppSelector(offerDataSelector);
  return offer;
}
