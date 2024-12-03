import type { MainOfferInfo } from '@entities/offer';
import FavoritesOffersGroup from '../favorites-offers-group';

type FavoritesOffersListProps = {
  offers: MainOfferInfo[];
};

export function FavoritesOffersList({ offers }: FavoritesOffersListProps): JSX.Element {
  const groupedOffers: Record<string, MainOfferInfo[]> = offers.reduce((accum, current) => ({
    ...accum,
    [`${current.city.name}`]: offers.filter((offer) => current.city.name === offer.city.name)
  }), {});

  return (
    <ul className='favorites__list'>
      {Object.keys(groupedOffers).map((current) =>
        (
          <FavoritesOffersGroup
            groupName={current}
            items={groupedOffers[current]}
            key={`favorite-offer-group-${current}`}
          />
        )
      )}
    </ul>
  );
}
