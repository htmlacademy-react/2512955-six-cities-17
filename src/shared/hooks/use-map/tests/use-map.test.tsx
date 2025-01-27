import { useMap } from '../use-map';
import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import leaflet from 'leaflet';
import { MutableRefObject } from 'react';
import { LeafletPoint, TileLayerSettings } from '../types';
import faker from 'faker';

const DEFAULT_TILE_LAYER_SETTINGS: TileLayerSettings = {
  urlTemplate: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  options: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
};

const MAP_CENTER: LeafletPoint = {
  location: {
    latitude: Number(faker.address.latitude()),
    longitude: Number(faker.address.longitude()),
    zoom: faker.datatype.number({max: 13, min: 1})
  },
  name: faker.address.city()
};

describe('Hook \'useMap\'', () => {
  it('should return correct signature', () => {
    const mapRef = createRef() as MutableRefObject<HTMLElement>;
    mapRef.current = document.createElement('div');

    const { result } = renderHook(() => useMap(mapRef, MAP_CENTER, DEFAULT_TILE_LAYER_SETTINGS));
    const map = result.current;

    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(leaflet.Map);
  });

  it('should return map with setted center', () => {
    const mapRef = createRef() as MutableRefObject<HTMLElement>;
    mapRef.current = document.createElement('div');

    const { result } = renderHook(() => useMap(mapRef, MAP_CENTER, DEFAULT_TILE_LAYER_SETTINGS));
    const map = result.current;

    if (map) {
      const center = map.getCenter();
      expect(center.lng).toBe(MAP_CENTER.location.longitude);
      expect(center.lat).toBe(MAP_CENTER.location.latitude);
    }
    expect(map).not.toBeNull();
  });
});
