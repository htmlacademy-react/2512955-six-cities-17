import { FavoritesOffersGroup } from '../favorites-offers-group';
import { withRouter } from '@test-utills/hocs';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { RoutesEnum } from '@shared/types';
import userEvent from '@testing-library/user-event';

const FAKE_OFFER_CARD_TEXT = 'Fake offer card';
const FAKE_MAIN_PAGE_TEXT = 'Fake main page';

const FakeOfferCard = () => <p>{FAKE_OFFER_CARD_TEXT}</p>;
const FakeMainPage = () => <p>{FAKE_MAIN_PAGE_TEXT}</p>;

const createPropsMock = (offersCount: number): Omit<ComponentProps<typeof FavoritesOffersGroup>, 'onFavoriteButtonClick'> => ({
  groupName: 'Amsterdam',
  items: faker.datatype.array(offersCount).map(() => createMainOfferInfoMock()),
});

describe('Component FavoritesOffersGroup', () => {
  const offerGroupTestId = 'favorites__locations-items';
  const onFavoriteButtonClickMock = vi.fn();

  beforeEach(() => {
    onFavoriteButtonClickMock.mockReset();
  });

  it('should correct render', async () => {
    vi.spyOn(await import('@entities/offer'), 'default')
      .mockImplementation(FakeOfferCard);
    const offersCount = 2;
    const propsMock = createPropsMock(offersCount);
    const component = withRouter(<FavoritesOffersGroup onFavoriteButtonClick={onFavoriteButtonClickMock} {...propsMock} />);
    const screen = render(component);

    expect(screen.getByTestId(offerGroupTestId)).toBeInTheDocument();
    expect(screen.getByText(propsMock.groupName)).toBeInTheDocument();
    expect(screen.getAllByText(FAKE_OFFER_CARD_TEXT).length).toBe(offersCount);
  });

  it('should navigate on MainPage by group link click', async () => {
    const history = createMemoryHistory();
    history.replace(RoutesEnum.Favorites);
    vi.spyOn(await import('@entities/offer'), 'default')
      .mockImplementation(FakeOfferCard);
    const offersCount = 2;
    const propsMock = createPropsMock(offersCount);
    const component = withRouter(
      <Routes>
        <Route path={RoutesEnum.Favorites} element={<FavoritesOffersGroup onFavoriteButtonClick={onFavoriteButtonClickMock} {...propsMock} />} />
        <Route path={RoutesEnum.Main} element={<FakeMainPage />} />
      </Routes>,
      history
    );

    const screen = render(component);
    expect(screen.getByTestId(offerGroupTestId)).toBeInTheDocument();
    expect(screen.getByText(propsMock.groupName)).toBeInTheDocument();
    expect(screen.getAllByText(FAKE_OFFER_CARD_TEXT).length).toBe(offersCount);

    await userEvent.click(screen.getByText(propsMock.groupName));

    expect(screen.queryByTestId(offerGroupTestId)).not.toBeInTheDocument();
    expect(screen.getByText(FAKE_MAIN_PAGE_TEXT)).toBeInTheDocument();
  });
});
