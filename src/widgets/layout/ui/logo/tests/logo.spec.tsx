import { Logo } from '../logo';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';

describe('Component Logo', () => {
  it('should correct render', () => {
    const component = withRouter(<Logo />);

    const screen = render(component);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
