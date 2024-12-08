import type { OfferCityName } from '@entities/offer';
import { RoutesEnum } from '@shared/types';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

type LocationsFilterItemProps = {
  filterValue: OfferCityName;
  onLinkClick: (filterValue: OfferCityName) => void;
  isActive: boolean;
}

export function LocationsFilterItem({ filterValue, onLinkClick, isActive }: LocationsFilterItemProps): JSX.Element {
  /*const linkClassName = classNames(
    'locations__item-link',
    'tabs__item',
    {
      'tabs__item--active': isActive
    });*/

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
