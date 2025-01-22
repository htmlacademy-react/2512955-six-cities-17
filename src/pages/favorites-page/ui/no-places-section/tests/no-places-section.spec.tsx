import { render } from '@testing-library/react';
import { NoPlacesSection } from '../no-places-section';

describe('Component NoPlacesSection by favorites offers', () => {
  const headerText = /^favorites \(empty\)/i;
  const statusText = /^nothing yet saved/i;
  const descriptionText = /^save properties to narrow down search or plan your future trips/i;

  it('should correct render', () => {
    const screen = render(<NoPlacesSection />);

    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(statusText)).toBeInTheDocument();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });
});
