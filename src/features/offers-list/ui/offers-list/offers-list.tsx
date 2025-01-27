import type { MainOfferInfo } from '@entities/offer';
import OfferCard, { type ViewType } from '@entities/offer';
import { Classed } from '@shared/types';
import classNames from 'classnames';

type OffersListProps = Classed<{
  offers: MainOfferInfo[];
  onActivateOffer?: (offerId: string) => void;
  viewType?: Exclude<ViewType, 'favorites'>;
  onFavoriteClick: (offerId: string, isFavorite: boolean) => void;
}>

export function OffersList({ offers, className, onActivateOffer, viewType = 'main', onFavoriteClick }: OffersListProps): JSX.Element {
  const listClassName = classNames(
    {
      'cities__places-list': viewType === 'main',
      'near-places__list': viewType === 'near'
    },
    'places__list',
    className
  );

  return (
    <div className={listClassName} data-testid='offer-list-container'>
      {offers.map((current) => (
        <OfferCard
          offer={current}
          key={current.id}
          viewType={viewType}
          onActivateOffer={onActivateOffer}
          onFavoritesButtonClick={onFavoriteClick}
        />))}
    </div>
  );
}
