import { ComponentProps } from 'react';
import { OfferInsides } from '../offer-insides';
import faker from 'faker';
import { render } from '@testing-library/react';

const createPropsMock = (insidesCount: number): ComponentProps<typeof OfferInsides> => ({
  insides: Array.from({length: insidesCount}).map(() => faker.lorem.words(1)),
  offerId: faker.datatype.uuid()
});

describe('Component OfferInsides', () => {

  const insideItemTestId = 'offer-insides-list-item';
  const headerText = 'What\'s inside';

  it('should correct render for insides exists', () => {
    const insidesCount = 5;
    const propsMock = createPropsMock(insidesCount);

    const screen = render(
      <OfferInsides insides={propsMock.insides} offerId={propsMock.offerId} />
    );

    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getAllByTestId(insideItemTestId).length).toBe(insidesCount);
  });

  it('should correct render for insides not exists', () => {
    const insidesCount = 0;
    const propsMock = createPropsMock(insidesCount);

    const screen = render(
      <OfferInsides insides={propsMock.insides} offerId={propsMock.offerId} />
    );

    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.queryAllByTestId(insideItemTestId).length).toBe(insidesCount);
  });
});
