import { useActiveLocation } from '@features/locations-filter-list';
import { isOfferCityName } from '@pages/main-page/lib/type-guards/is-offer-city-name';
import { DEFAULT_CITY } from '@pages/main-page/config';
import { offerSortTypeToComparerMap, useOfferSorting } from '@features/offer-sorting-select';
import { OfferCityName, useMainOffersListData } from '@entities/offer';
import { ReactNode, useMemo } from 'react';
import { getPageStyles } from './get-styles';
import Layout from '@widgets/layout';
import { MainPageCities } from '../main-page-cities';

type MainPageContentProps = {
  activeCitySearchParam: OfferCityName;
  tabSection: ReactNode;
}

export function MainPageContent({ activeCitySearchParam, tabSection }: MainPageContentProps) {
  const { activeLocation } = useActiveLocation(isOfferCityName(activeCitySearchParam) ? activeCitySearchParam : DEFAULT_CITY);
  const { activeSotingType } = useOfferSorting();
  const offers = useMainOffersListData();

  const filteredOffers = useMemo(
    () => offers.filter((current) => current.city.name === activeLocation).sort(offerSortTypeToComparerMap.get(activeSotingType)),
    [activeLocation, activeSotingType, offers]
  );

  const isOffersExists = filteredOffers.length > 0;

  const { containerClassName, contentClassName } = getPageStyles(isOffersExists);

  return (
    <Layout.Content className={contentClassName}>
      <h1 className='visually-hidden'>Cities</h1>
      {tabSection}
      {isOffersExists &&
        <MainPageCities
          activeLocation={activeLocation}
          offers={filteredOffers}
          className={containerClassName}
        />}
    </Layout.Content>
  );
}
