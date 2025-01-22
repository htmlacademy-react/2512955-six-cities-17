import { withRouter } from '@test-utills/hocs';
import { LocationLink } from '../location-link';
import { RoutesEnum } from '@shared/types';
import { render } from '@testing-library/react';

describe('Component LocationLink', () => {
  it('should correct render', () => {
    const linkCaption = 'caption';
    const component = withRouter(<LocationLink to={RoutesEnum.Favorites} caption={linkCaption}/>);

    const screen = render(component);

    expect(screen.getByText(linkCaption)).toBeInTheDocument();
  });
});
