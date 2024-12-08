import { MutableRefObject, useEffect, useRef, useState } from 'react';
import type { LeafletPoint } from './types';
import { Nullable } from '@shared/types';
import leaflet from 'leaflet';

export function useMap<TRefType extends Nullable<HTMLElement>>(mapRef: MutableRefObject<TRefType>, city: LeafletPoint): Nullable<leaflet.Map> {
  const [map, setMap] = useState<Nullable<leaflet.Map>>(null);
  const isRenderedMap = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedMap.current) {
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      setMap(mapInstance);
      isRenderedMap.current = true;
    }
  }, [city, setMap, mapRef, map]);

  useEffect(() => {
    if (map) {
      const center = map.getCenter();
      if (center.lat !== city.location.latitude || center.lng !== city.location.longitude) {
        map.flyTo({
          lat: city.location.latitude,
          lng: city.location.longitude
        }, city.location.zoom, {
          duration: 1.5
        });
      }
    }
  }, [city, map]);

  return map;
}
