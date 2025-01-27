import type { OfferType } from '@entities/offer';

type OfferFeaturesListProps = {
  type: OfferType;
  bedrooms: number;
  maxAudits: number;
}

export function OfferFeaturesList({ bedrooms, maxAudits, type }: OfferFeaturesListProps): JSX.Element {
  return (
    <ul className='offer__features' data-testid='offer-features-list-container'>
      <li className='offer__feature offer__feature--entire'>
        {type}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {`${bedrooms} ${bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`}
      </li>
      <li className='offer__feature offer__feature--adults'>
        {`Max ${maxAudits} ${maxAudits === 1 ? 'adult' : 'adults'}`}
      </li>
    </ul>
  );
}
