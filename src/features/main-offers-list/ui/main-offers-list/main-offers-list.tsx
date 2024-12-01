import type { MainOfferInfo } from '@entities/offer';
import OfferCard from '@entities/offer';
import { Classed } from '@shared/types';
import classNames from 'classnames';
import { useState } from 'react';
import { Nullable } from 'vitest';

type MainOffersListProps = Classed<{
  offers: MainOfferInfo[];
}>

export function MainOffersList({ offers, className }: MainOffersListProps): JSX.Element {
  const listClassName = classNames('cities__places-list', 'places__list tabs__content', className);
  const [activeOffer, setActiveOffer] = useState<Nullable<string>>(null);

  const activateOffer = (id: string) => {
    if (id !== activeOffer) {
      setActiveOffer(id);
    }
  };

  return (
    <div className={listClassName}>
      {offers.map((current) => <OfferCard offer={current} key={current.id} viewType='main' activateOffer={activateOffer} />)}
    </div>
  );
}
