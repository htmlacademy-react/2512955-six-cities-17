import type { MainOfferInfo, OfferCityName } from '@entities/offer';
import FavoritesOffersGroup from '../favorites-offers-group';
import { useAddToFavoriteOffer } from '@features/add-offer-to-favorites';

type FavoritesOffersListProps = {
  offers: MainOfferInfo[];
};

export function FavoritesOffersList({ offers }: FavoritesOffersListProps): JSX.Element {
  const cities = Array.from(new Set(offers.map((current) => current.city.name)));

  const addToFavorite = useAddToFavoriteOffer();

  const groupedOffers: Record<string, MainOfferInfo[]> | null = cities.reduce((accum, current) => ({
    ...accum,
    [current]: offers.filter((offer) => current === offer.city.name)
  }), {});

  const favoriteButtonClickHandler = (offerId: string, isFavorite: boolean) => {
    addToFavorite(offerId, isFavorite);
  };


  return (
    <ul className='favorites__list' data-testid='favorites-offers-list'>
      {Object.keys(groupedOffers).map((current) =>
        (
          <FavoritesOffersGroup
            groupName={current}
            items={groupedOffers[current as OfferCityName]}
            key={`favorite-offer-group-${current}`}
            onFavoriteButtonClick={favoriteButtonClickHandler}
          />
        )
      )}
    </ul>
  );
}
