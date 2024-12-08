import type { OfferCityName } from '@entities/offer';
import { LocationsFilterItem } from '../locations-filter-item';

type LocationsFilterListProps = {
  activeFilter: OfferCityName;
  allFilterItems: OfferCityName[];
  onFilterChange: (filterValue: OfferCityName) => void;
}

export function LocationsFilterList({ activeFilter, allFilterItems, onFilterChange }: LocationsFilterListProps): JSX.Element {
  const linkClickHandler = (filterValue: OfferCityName) => onFilterChange(filterValue);
  return (
    <ul className='locations__list tabs__list'>
      {allFilterItems.map((current) => (
        <LocationsFilterItem filterValue={current} onLinkClick={linkClickHandler} isActive={current === activeFilter} key={`city-filter-${current}`} />
      ))}
    </ul>
  );
}
