import Layout from '@widgets/layout';
import type { MainOfferInfo } from '@entities/offer';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { useEffect, useMemo } from 'react';
import LocationsFilterList, { useActiveLocation } from '@features/locations-filter-list/';
import { ALL_CITIES_NAMES, PAGE_TITLE, DEFAULT_CITY, DEFAULT_SEARCH_PARAMS } from '@pages/main-page/config';
import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from '@shared/lib/url';
import { SearchParams } from '@pages/main-page/model';
import { getPageStyles } from './get-styles';
import { isOfferCityName } from './type-guards';
import { offerSortTypeToComparerMap, useOfferSorting } from '@features/offer-sorting-select';
import { MainPageCities } from '../main-page-cities';

type MainPageProps = {
  offers: MainOfferInfo[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);
  const activeCitySearchParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);
  const { activeLocation } = useActiveLocation(isOfferCityName(activeCitySearchParam) ? activeCitySearchParam : DEFAULT_CITY);
  const { activeSotingType } = useOfferSorting();

  const filteredOffers = useMemo(
    () => offers.filter((current) => current.city.name === activeLocation).sort(offerSortTypeToComparerMap.get(activeSotingType)),
    [activeLocation, activeSotingType, offers]
  );

  const isOffersExists = filteredOffers.length > 0;

  useEffect(() => {
    let componentIsMounted = true;
    const activeCityParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);
    if (!isOfferCityName(activeCityParam) && componentIsMounted) {
      setSearchParams({activeCity: DEFAULT_CITY});
    }

    return () => {
      componentIsMounted = false;
    };
  }, [searchParams, setSearchParams]);

  const { containerClassName, contentClassName } = getPageStyles(isOffersExists);

  return (
    <Layout className='page--gray page--main'>
      <Layout.Header />
      <Layout.Content className={contentClassName}>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <LocationsFilterList
              activeFilter={activeLocation}
              allFilterItems={ALL_CITIES_NAMES}
            />
          </section>
        </div>
        {isOffersExists &&
          <MainPageCities
            activeLocation={activeLocation}
            offers={filteredOffers}
            className={containerClassName}
          />}
      </Layout.Content>
    </Layout>
  );
}

export const MainPageWithBrowserTitle = componentWithBrowserTitle(MainPage, PAGE_TITLE);
