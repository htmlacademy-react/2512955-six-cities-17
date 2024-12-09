import type { OfferCityName } from '@entities/offer';
import { RoutesEnum } from '@shared/types';
import { NavLink } from 'react-router-dom';

type LocationsFilterItemProps = {
  filterValue: OfferCityName;
  onLinkClick: (filterValue: OfferCityName) => void;
  isActive: boolean;
}

export function LocationsFilterItem({ filterValue, onLinkClick, isActive }: LocationsFilterItemProps): JSX.Element {
  return (
    <li className='locations__item'>
      <NavLink
        className={({ isActive: isLinkActive }) =>
          `locations__item-link tabs__item ${isLinkActive && isActive ? 'tabs__item--active' : ''}`}
        to={`${RoutesEnum.Main}?activeCity=${filterValue}`}
        onClick={() => onLinkClick(filterValue)}
      >
        <span>{filterValue}</span>
      </NavLink>
    </li>
  );
}
