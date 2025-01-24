import { useOfferInfoData } from '@pages/offer-page/lib/offer-page-data';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { OfferInfo } from '../offer-info';
import { NearOffersMap } from '../near-offers-map';
import type { LeafletPoint } from '@features/leaflet-map';

type OfferMainInfoSectionProps = PropsWithChildren<{
  onFavoriteButtonClick: (offerId: string, isFavorite: boolean) => void;
}>

export function OfferMainInfoSection({ onFavoriteButtonClick, children }: OfferMainInfoSectionProps): ReactNode {
  const offer = useOfferInfoData();
  const offerPoin: LeafletPoint = useMemo(
    () => ({
      location: {
        latitude: offer?.location.latitude ?? 0,
        longitude: offer?.location.longitude ?? 0,
        zoom: offer?.location.zoom ?? 0
      },
      name: offer?.title ?? ''
    }),
    [offer?.location.latitude, offer?.location.longitude, offer?.title, offer?.location.zoom]
  );

  return !!offer && (
    <OfferInfo
      offer={offer}
      onFavoritesButtonClick={onFavoriteButtonClick}
      leafletMap={<NearOffersMap mainOfferPoint={offerPoin} />}
    >
      {children}
    </OfferInfo>
  );
}
