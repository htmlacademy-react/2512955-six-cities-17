import { FavoritesOffersGroup } from '../favorites-offers-group';
import { withRouter } from '@test-utills/hocs';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import faker from 'faker';

const createPropsMock = (offersCount: number): ComponentProps<typeof FavoritesOffersGroup> => ({
  groupName: 'Amsterdam',
  items: faker.datatype.array(offersCount).map(() => createMainOfferInfoMock()),
  onFavoriteButtonClick: vi.fn()
});

describe('Component FavoritesOffersGroup', () => {
  const offerGroupTestId = 'favorites__locations-items';
  const offerCardTestId = 'offer-card-component';

  it('should correct render', () => {
    const offersCount = 2;
    const propsMock = createPropsMock(offersCount);
    const component = withRouter(<FavoritesOffersGroup {...propsMock} />);
    const screen = render(component);

    expect(screen.getByTestId(offerGroupTestId)).toBeInTheDocument();
    expect(screen.getByText(propsMock.groupName)).toBeInTheDocument();
    expect(screen.getAllByTestId(offerCardTestId).length).toBe(offersCount);
  });
});
