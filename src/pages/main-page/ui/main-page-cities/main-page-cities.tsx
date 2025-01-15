import type { MainOfferInfo, OfferCityName } from '@entities/offer';
import LeafletMap from '@features/leaflet-map';
import { OfferSortingSelect } from '@features/offer-sorting-select';
import OffersList from '@features/offers-list';
import type { Classed, Nullable } from '@shared/types';
import { ComponentProps, useEffect, useState } from 'react';
import NoPlacesSection from '../no-places-section';
import { useAddToFavoriteOffer } from '@features/add-offer-to-favorites';

type MainPageCitiesProps = Classed<{
  offers: MainOfferInfo[];
  activeLocation: OfferCityName;
}>

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


export function MainPageCities({ offers, className, activeLocation }: MainPageCitiesProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<Nullable<string>>(null);
  const isOffersExists = offers.length > 0;
  const mapProps = getLeafletMapProps(offers, activeOfferId);
  const addToFavorite = useAddToFavoriteOffer();

  useEffect(
    () => {
      if (!offers.find((current) => current.id === activeOfferId)) {
        setActiveOfferId(null);
      }
    },
    [activeOfferId, offers]
  );

  return (
    <div className='cities'>
      <div className={className}>
        {isOffersExists ?
          <section className='cities__places places'>
            <h2 className='visually-hidden'>Places</h2>
            <b className='places__found'>{offers.length} places to stay in {activeLocation}</b>
            <form className='places__sorting' action='#' method='get'>
              <span className='places__sorting-caption'>Sort by&nbsp;</span>
              <OfferSortingSelect />
            </form>
            <OffersList
              offers={offers}
              onActivateOffer={setActiveOfferId}
              className='tabs__content'
              onFavoriteClick={addToFavorite}
            />
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
  );
}
