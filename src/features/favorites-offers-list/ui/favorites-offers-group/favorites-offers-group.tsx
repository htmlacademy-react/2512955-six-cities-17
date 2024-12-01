import type { MainOfferInfo } from '@entities/offer';
import OfferCard from '@entities/offer';

type FavoritesOffersGroupProps = {
  groupName: string;
  items: MainOfferInfo[];
};

export function FavoritesOffersGroup({ items, groupName }: FavoritesOffersGroupProps): JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#'>
            <span>{groupName}</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        {items.map((current) => <OfferCard viewType='favorites' offer={current} key={current.id}/>)}
      </div>
    </li>
  );
}
