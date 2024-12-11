import type { Location } from '@shared/types';
import type { TileLayerOptions } from 'leaflet';

export type LeafletPoint = {
  name: string;
  location: Location;
}

export type TileLayerSettings = {
  urlTemplate: string;
  options?: TileLayerOptions;
}
