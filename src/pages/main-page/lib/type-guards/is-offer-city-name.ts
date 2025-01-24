import { ALL_CITIES_NAMES } from '@pages/main-page/config';
import type { OfferCityName } from '@entities/offer';

export function isOfferCityName(value: string): value is OfferCityName {
  return !!ALL_CITIES_NAMES.find((current) => current === value);
}
