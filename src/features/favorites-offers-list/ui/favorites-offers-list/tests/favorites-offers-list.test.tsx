import { FavoritesOffersList } from '../favorites-offers-list';
import { withRouter } from '@test-utills/hocs';
import faker from 'faker';
import { MainOfferInfo, OfferCityName } from '@entities/offer';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { AuthorizationStatusEnum } from '@shared/types';
import { createUserMock } from '@test-utills/mock/user';
import { render } from '@testing-library/react';

vi.mock('@features/add-offer-to-favorites', () => ({
  useAddToFavoriteOffer: vi.fn()
}));

const createOffersByPlaceMock = (place: OfferCityName, offersCount: number): MainOfferInfo[] =>
  faker.datatype.array(offersCount).map(() => {
    const offerMock = createMainOfferInfoMock();
    offerMock.city.name = place;
    return offerMock;
  });

describe('Component FavoritesOffersList', () => {
  const offerGroupTestId = 'favorites__locations-items';

  it('should correct render', async () => {
    const offersByGroupCount = 2;
    const groupsCount = 2;
    vi.spyOn(await import('@entities/user'), 'useAuthorization').mockImplementation(() => ({
      authorizationStatus: AuthorizationStatusEnum.Authorized,
      checkAuthorization: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      user: createUserMock()
    }));
    const offers = createOffersByPlaceMock('Amsterdam', offersByGroupCount).concat(createOffersByPlaceMock('Brussels', offersByGroupCount));
    const component = withRouter(<FavoritesOffersList offers={offers}/>);

    const screen = render(component);

    expect(screen.getAllByTestId(offerGroupTestId).length).toBe(groupsCount);
  });
});
