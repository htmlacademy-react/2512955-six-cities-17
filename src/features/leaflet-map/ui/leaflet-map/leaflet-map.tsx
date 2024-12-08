import { Classed, Nullable } from '@shared/types';
import { useEffect, useRef } from 'react';
import type { LeafletPoint } from '@shared/hooks/use-map';
import { useMap } from '@shared/hooks/use-map';
import { ACTIVE_ICON, DEFAULT_ICON } from '@features/leaflet-map/config';
import leaflet from 'leaflet';

type LeafletMapProps = Classed<{
  city: LeafletPoint;
  points: LeafletPoint[];
  selectedPoint: Nullable<LeafletPoint>;
}>

const isEqualsPoints = (firstPoint: LeafletPoint, secondPoint: LeafletPoint): boolean =>
  firstPoint.location.latitude === secondPoint?.location.latitude && firstPoint.location.longitude === secondPoint?.location.longitude;

export function LeafletMap({ city, className, points, selectedPoint }: LeafletMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(
    () => {
      const leafletMarkers = map
        ? points.map((current) => leaflet.marker({
          lat: current.location.latitude,
          lng: current.location.longitude
        }, {
          icon: selectedPoint && isEqualsPoints(current, selectedPoint) ? ACTIVE_ICON : DEFAULT_ICON
        }).bindTooltip(() => current.name, {
          direction: 'top',
        }))
        : [];

      if (map) {
        leafletMarkers.forEach((current) => current.addTo(map));
      }

      return () => {
        if (map) {
          leafletMarkers.forEach((current) => map.removeLayer(current));
        }
      };
    },
    [points, selectedPoint, map]
  );

  return (
    <section ref={mapRef} className={className}></section>
  );
}
