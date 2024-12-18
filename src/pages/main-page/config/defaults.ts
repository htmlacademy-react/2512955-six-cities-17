import { CSSProperties } from 'react';
import { OfferCityName } from '@entities/offer';
import { SearchParams } from '../model/types';

export const DEFAULT_STYLES_CONTAINER: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '50px 0'
};

export const DEFAULT_STYLES_IMAGE: CSSProperties = {
  width: 300,
  height: 300
};

export const ALL_CITIES_NAMES: OfferCityName[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const PAGE_TITLE = '6 cities';

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
  activeCity: 'Paris',
};

export const DEFAULT_CITY: OfferCityName = 'Paris';
