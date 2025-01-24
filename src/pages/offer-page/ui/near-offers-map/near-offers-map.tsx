import { MainOfferInfo } from '@entities/offer';
import LeafletMap, { type LeafletPoint } from '@features/leaflet-map';
import { useNearOffersData } from '@pages/offer-page/lib/offer-page-data';
import { ComponentProps, ReactNode } from 'react';

type NearOffersMapProps = {
  mainOfferPoint: LeafletPoint;
}

const getMapProps = (offerPoint: LeafletPoint, nearOffers: MainOfferInfo[]): ComponentProps<typeof LeafletMap> => ({
  center: offerPoint,
  points: [offerPoint, ...nearOffers.map((current) => ({ location: current.location, name: current.title }))],
  selectedPoint: offerPoint,
  className: 'offer__map'
});

export function NearOffersMap({ mainOfferPoint }: NearOffersMapProps): ReactNode {
  const nearOffers = useNearOffersData();
  const mapProps = getMapProps(mainOfferPoint, nearOffers);
  return <LeafletMap {...mapProps} />;
}
