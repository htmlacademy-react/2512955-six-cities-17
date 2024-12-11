import Layout from '@widgets/layout';
import type { MainOfferInfo, OfferCityName } from '@entities/offer';
import { componentWithBrowserTitle } from '@shared/hoc/component-with-browser-title';
import OffersList from '@features/offers-list';
import NoPlacesSection from '../no-places-section';
import { UserInfo } from '@entities/user';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import { Nullable } from '@shared/types';
import LocationsFilterList from '@features/locations-filter-list/';
import { ALL_CITIES_NAMES, PAGE_TITLE, DEFAULT_CITY, DEFAULT_SEARCH_PARAMS } from '@pages/main-page/config';
import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from '@shared/lib/url';
import { SearchParams } from '@pages/main-page/model';
import { getPageStyles } from './get-styles';
import { isOfferCityName } from './type-guards';
import LeafletMap from '@features/leaflet-map';

type MainPageProps = {
  offers: MainOfferInfo[];
}

function getLeafletMapProps(offers: MainOfferInfo[], activeOfferId: Nullable<string>): ComponentProps<typeof LeafletMap> {
  const activeOffer = activeOfferId
    ? offers.find((current) => current.id === activeOfferId)
    : undefined;

  return {
    center: {
      location: offers[0].city.location,
      name: offers[0].city.name
    },
    points: offers.map((current) => ({
      location: current.location,
      name: current.title
    })),
    selectedPoint: activeOffer ? {
      location: activeOffer.location,
      name: activeOffer.title
    } : null
  };
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<Nullable<string>>(null);
  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS);
  const activeCitySearchParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);
  const [activeCity, setActiveCity] = useState<OfferCityName>(isOfferCityName(activeCitySearchParam) ? activeCitySearchParam : DEFAULT_CITY);

  const filteredOffers = useMemo(
    () => offers.filter((current) => current.city.name === activeCity),
    [activeCity, offers]
  );
  const mapProps = useMemo(
    () => filteredOffers.length ? getLeafletMapProps(filteredOffers, activeOfferId) : null,
    [filteredOffers, activeOfferId]
  );

  const isOffersExists = filteredOffers.length > 0;

  useEffect(() => {
    let componentIsMounted = true;
    const activeCityParam = getSearchParam<SearchParams, keyof SearchParams>(searchParams, 'activeCity', DEFAULT_CITY);
    if (!isOfferCityName(activeCityParam) && componentIsMounted) {
      setSearchParams({activeCity: DEFAULT_CITY});
      setActiveCity(DEFAULT_CITY);
    }

    return () => {
      componentIsMounted = false;
    };
  }, [searchParams, setSearchParams]);

  const { containerClassName, contentClassName } = getPageStyles(isOffersExists);

  const activeCityChangeHandler = (cityName: OfferCityName) => {
    if (activeCity !== cityName) {
      setActiveCity(cityName);
      setActiveOfferId(null);
    }
  };

  return (
    <Layout className='page--gray page--main'>
      <Layout.Header>
        <UserInfo favoritesCount={offers.filter((current) => current.isFavorite).length} />
      </Layout.Header>
      <Layout.Content className={contentClassName}>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <LocationsFilterList
              activeFilter={activeCity}
              allFilterItems={ALL_CITIES_NAMES}
              onFilterChange={activeCityChangeHandler}
            />
          </section>
        </div>
        <div className='cities'>
          <div className={containerClassName}>
            {isOffersExists ?
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>{filteredOffers.length} places to stay in {activeCity}</b>
                <form className='places__sorting' action='#' method='get'>
                  <span className='places__sorting-caption'>Sort by&nbsp;</span>
                  <span className='places__sorting-type' tabIndex={0}>
                    Popular
                    <svg className='places__sorting-arrow' width='7' height='4'>
                      <use xlinkHref='#icon-arrow-select'></use>
                    </svg>
                  </span>
                  <ul className='places__options places__options--custom places__options--opened'>
                    <li className='places__option places__option--active' tabIndex={0}>Popular</li>
                    <li className='places__option' tabIndex={0}>Price: low to high</li>
                    <li className='places__option' tabIndex={0}>Price: high to low</li>
                    <li className='places__option' tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OffersList offers={filteredOffers} onActivateOffer={setActiveOfferId} className='tabs__content' />
              </section>
              :
              <NoPlacesSection />}
            <div className='cities__right-section'>
              {(isOffersExists && mapProps) &&
                <LeafletMap
                  className='cities__map'
                  {...mapProps}
                />}
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export const MainPageWithBrowserTitle = componentWithBrowserTitle(MainPage, PAGE_TITLE);
