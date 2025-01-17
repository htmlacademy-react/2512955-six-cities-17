import Layout from '@widgets/layout';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import { useEffect } from 'react';
import { PAGE_TITLE, DEFAULT_CITY, DEFAULT_SEARCH_PARAMS, ALL_CITIES_NAMES } from '@pages/main-page/config';
import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from '@shared/lib/url';
import { SearchParams } from '@pages/main-page/model';
import { isOfferCityName } from '@pages/main-page/lib/type-guards/is-offer-city-name';
import { MainPageContent } from '../main-page-content';
import LocationsFilterList from '@features/locations-filter-list';

function MainPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);
  const activeCitySearchParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);

  useEffect(() => {
    let componentIsMounted = true;
    const activeCityParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);
    if (!isOfferCityName(activeCityParam) && componentIsMounted) {
      setSearchParams({ activeCity: DEFAULT_CITY });
    }

    return () => {
      componentIsMounted = false;
    };
  }, [searchParams, setSearchParams]);

  return (
    <Layout className='page--gray page--main'>
      <Layout.Header />
      <MainPageContent
        activeCitySearchParam={activeCitySearchParam}
        tabSection={
          <div className='tabs'>
            <section className='locations container'>
              <LocationsFilterList
                allFilterItems={ALL_CITIES_NAMES}
              />
            </section>
          </div>
        }
      />
    </Layout>
  );
}

export const MainPageWithBrowserTitle = componentWithBrowserTitle(MainPage, PAGE_TITLE);
