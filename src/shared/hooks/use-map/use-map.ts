import { MutableRefObject, useEffect, useRef, useState } from 'react';
import type { LeafletPoint, TileLayerSettings } from './types';
import { Nullable } from '@shared/types';
import leaflet from 'leaflet';

export function useMap<TRefType extends Nullable<HTMLElement>>(mapRef: MutableRefObject<TRefType>, center: LeafletPoint, config: TileLayerSettings): Nullable<leaflet.Map> {
  const [map, setMap] = useState<Nullable<leaflet.Map>>(null);
  const isRenderedMap = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedMap.current) {
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: center.location.latitude,
          lng: center.location.longitude
        },
        zoom: center.location.zoom
      });

      leaflet.tileLayer(config.urlTemplate, config.options).addTo(mapInstance);

      setMap(mapInstance);
      isRenderedMap.current = true;
    }
  }, [center, setMap, mapRef, config]);

  useEffect(() => {
    if (map) {
      const mapCenter = map.getCenter();
      if (mapCenter.lat !== center.location.latitude || mapCenter.lng !== center.location.longitude) {
        map.flyTo({
          lat: center.location.latitude,
          lng: center.location.longitude
        }, center.location.zoom, {
          duration: 1.5
        });
      }
    }
  }, [center, map]);

  return map;
}
