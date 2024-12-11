import type { MainOfferInfo } from '@entities/offer';
import OfferCard, {type ViewType } from '@entities/offer';
import { Classed } from '@shared/types';
import classNames from 'classnames';

type OffersListProps = Classed<{
  offers: MainOfferInfo[];
  onActivateOffer?: (offerId: string) => void;
  viewType?: Exclude<ViewType, 'favorites'>;
}>

export function OffersList({ offers, className, onActivateOffer, viewType = 'main' }: OffersListProps): JSX.Element {
  const listClassName = classNames(
    {
      'cities__places-list': viewType === 'main',
      'near-places__list': viewType === 'near'
    },
    'places__list',
    className
  );

  return (
    <div className={listClassName}>
      {offers.map((current) => <OfferCard offer={current} key={current.id} viewType={viewType} onActivateOffer={onActivateOffer} />)}
    </div>
  );
}
