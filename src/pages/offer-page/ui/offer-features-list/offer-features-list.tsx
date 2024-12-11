import type { OfferType } from '@entities/offer';

type OfferFeaturesListProps = {
  type: OfferType;
  bedrooms: number;
  maxAudits: number;
}

export function OfferFeaturesList({ bedrooms, maxAudits, type }: OfferFeaturesListProps): JSX.Element {
  return (
    <ul className='offer__features'>
      <li className='offer__feature offer__feature--entire'>
        {type}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {bedrooms} Bedrooms
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max {maxAudits} adults
      </li>
    </ul>
  );
}
