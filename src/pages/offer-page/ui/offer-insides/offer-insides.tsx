type OfferInsidesProps = {
  insides: string[];
  offerId: string;
}

export function OfferInsides({ insides, offerId }: OfferInsidesProps): JSX.Element {

  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {insides.map((current) => (
          <li key={`offer-inside-${offerId}-${current}`} className='offer__inside-item' data-testid='offer-insides-list-item'>
            {current}
          </li>
        ))}
      </ul>
    </div>
  );
}
