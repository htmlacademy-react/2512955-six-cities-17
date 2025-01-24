import type { OfferCityName } from '@entities/offer';
import { LocationsFilterItem } from '../locations-filter-item';
import { useActiveLocation } from '@features/locations-filter-list/lib/use-active-location';
import { useCallback } from 'react';

type LocationsFilterListProps = {
  allFilterItems: OfferCityName[];
  onFilterChange?: (filterValue: OfferCityName) => void;
}

export function LocationsFilterList({ allFilterItems, onFilterChange }: LocationsFilterListProps): JSX.Element {
  const { activeLocation, changeActiveLocation } = useActiveLocation();

  const linkClickHandler = useCallback(
    (filterValue: OfferCityName) => {
      if (filterValue !== activeLocation) {
        changeActiveLocation(filterValue);

        if (onFilterChange) {
          onFilterChange(filterValue);
        }
      }
    },
    [activeLocation, changeActiveLocation, onFilterChange]
  );
  return (
    <ul className='locations__list tabs__list' data-testid='locations-filter-container'>
      {allFilterItems.map((current) => (
        <LocationsFilterItem filterValue={current} onLinkClick={linkClickHandler} isActive={current === activeLocation} key={`city-filter-${current}`} />
      ))}
    </ul>
  );
}
