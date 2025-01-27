import { OfferCityName } from '@entities/offer';

export const ALL_CITIES_NAMES: OfferCityName[] = ['Amsterdam', 'Brussels', 'Cologne', 'Dusseldorf', 'Hamburg', 'Paris'];

export const getCityName = (): OfferCityName => {
  const cityIndex = Math.floor(Math.random() * ALL_CITIES_NAMES.length);

  return ALL_CITIES_NAMES[cityIndex];
};
