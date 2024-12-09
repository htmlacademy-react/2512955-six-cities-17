import type { MainOfferInfo } from '@entities/offer';
import OfferCard from '@entities/offer';
import { Classed } from '@shared/types';
import classNames from 'classnames';

type MainOffersListProps = Classed<{
  offers: MainOfferInfo[];
  onActivateOffer: (offerId: string) => void;
}>

export function MainOffersList({ offers, className, onActivateOffer }: MainOffersListProps): JSX.Element {
  const listClassName = classNames('cities__places-list', 'places__list tabs__content', className);

  return (
    <div className={listClassName}>
      {offers.map((current) => <OfferCard offer={current} key={current.id} viewType='main' onActivateOffer={onActivateOffer} />)}
    </div>
  );
}
