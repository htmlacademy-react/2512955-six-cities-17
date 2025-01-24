import { ComponentProps } from 'react';
import { OfferFeaturesList } from '../offer-features-list';
import { render } from '@testing-library/react';

const createPropsMock = (bedrooms: number, maxAudits: number): ComponentProps<typeof OfferFeaturesList> => ({
  bedrooms,
  maxAudits,
  type: 'house'
});

describe('Component OfferFeaturesList', () => {
  it('chould correct render by bedrooms != 1 and adults != 1', () => {
    const propsMock = createPropsMock(6, 6);
    const bedroomsText = `${propsMock.bedrooms} Bedrooms`;
    const adultsCaption = `Max ${propsMock.maxAudits} adults`;

    const screen = render(
      <OfferFeaturesList
        bedrooms={propsMock.bedrooms}
        maxAudits={propsMock.maxAudits}
        type={propsMock.type}
      />
    );

    expect(screen.getByText(bedroomsText)).toBeInTheDocument();
    expect(screen.getByText(adultsCaption)).toBeInTheDocument();
    expect(screen.getByText(propsMock.type)).toBeInTheDocument();
  });

  it('chould correct render by bedrooms = 1 and adults = 1', () => {
    const propsMock = createPropsMock(1, 1);
    const bedroomsText = `${propsMock.bedrooms} Bedroom`;
    const adultsCaption = `Max ${propsMock.maxAudits} adult`;

    const screen = render(
      <OfferFeaturesList
        bedrooms={propsMock.bedrooms}
        maxAudits={propsMock.maxAudits}
        type={propsMock.type}
      />
    );

    expect(screen.getByText(bedroomsText)).toBeInTheDocument();
    expect(screen.getByText(adultsCaption)).toBeInTheDocument();
    expect(screen.getByText(propsMock.type)).toBeInTheDocument();
  });
});
