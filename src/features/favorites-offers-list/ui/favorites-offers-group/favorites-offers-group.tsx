import type { MainOfferInfo } from '@entities/offer';
import OfferCard from '@entities/offer';
import { RoutesEnum } from '@shared/types';
import { Link } from 'react-router-dom';

type FavoritesOffersGroupProps = {
  groupName: string;
  items: MainOfferInfo[];
  onFavoriteButtonClick: (offerId: string, isFavorite: boolean) => void;
};

export function FavoritesOffersGroup({ items, groupName, onFavoriteButtonClick }: FavoritesOffersGroupProps): JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link className='locations__item-link' to={`${RoutesEnum.Main}?activeCity=${groupName}`}>
            <span>{groupName}</span>
          </Link>
        </div>
      </div>
      <div className='favorites__places'>
        {items.map((current) => <OfferCard viewType='favorites' offer={current} key={current.id} onFavoritesButtonClick={onFavoriteButtonClick}/>)}
      </div>
    </li>
  );
}
