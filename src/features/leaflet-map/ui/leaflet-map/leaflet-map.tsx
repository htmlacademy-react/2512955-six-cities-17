import { Classed, Nullable } from '@shared/types';
import { useEffect, useRef } from 'react';
import type { LeafletPoint } from '@shared/hooks/use-map';
import { useMap } from '@shared/hooks/use-map';
import { ACTIVE_ICON, DEFAULT_ICON } from '@features/leaflet-map/config';
import leaflet from 'leaflet';
import { DEFAULT_TILE_LAYER_SETTINGS } from '@features/leaflet-map/config';
import classNames from 'classnames';

type LeafletMapProps = Classed<{
  center: LeafletPoint;
  points: LeafletPoint[];
  selectedPoint?: Nullable<LeafletPoint>;
}>

const isEqualsPoints = (firstPoint: LeafletPoint, secondPoint: LeafletPoint): boolean =>
  firstPoint.location.latitude === secondPoint?.location.latitude && firstPoint.location.longitude === secondPoint?.location.longitude;

export function LeafletMap({ center, className, points, selectedPoint = null }: LeafletMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center, DEFAULT_TILE_LAYER_SETTINGS);
  const mapClassName = classNames(className, 'map');

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

      const markersGroup = leaflet.layerGroup(leafletMarkers);
      if (map) {
        markersGroup.addTo(map);
      }

      return () => {
        if (map) {
          map.removeLayer(markersGroup);
        }
      };
    },
    [points, selectedPoint, map]
  );

  return (
    <section ref={mapRef} className={mapClassName} data-testid='leaflet-map' />
  );
}
