import { OfferCityName } from '@entities/offer';
import { NoPlacesSection } from '../no-places-section';
import { render } from '@testing-library/react';

describe('Component NoPlacesSection', () => {
  const location: OfferCityName = 'Brussels';
  const description = `We could not find any property available at the moment in ${location}`;
  const status = 'No places to stay available';

  it('should correct render', () => {
    const screen = render(<NoPlacesSection location={location} />);

    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
