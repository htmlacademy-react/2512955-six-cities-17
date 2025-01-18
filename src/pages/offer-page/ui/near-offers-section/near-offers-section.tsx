import OffersList from '@features/offers-list';
import { useNearOffersData } from '@pages/offer-page/lib/offer-page-data';
import { ReactNode } from 'react';

type NearOffersSectionProps = {
  onFavoriteButtonClick: (offerId: string, isFavorite: boolean) => void;
}

export function NearOffersSection({ onFavoriteButtonClick }: NearOffersSectionProps): ReactNode {
  const nearOffers = useNearOffersData();

  return nearOffers?.length && (
    <div className='container'>
      <section className='near-places places'>
        <h2 className='near-places__title'>Other places in the neighbourhood</h2>
        <OffersList offers={nearOffers} viewType='near' onFavoriteClick={onFavoriteButtonClick} />
      </section>
    </div>
  );
}
