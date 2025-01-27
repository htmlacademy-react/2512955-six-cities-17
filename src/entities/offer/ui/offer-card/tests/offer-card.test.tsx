import { MainOfferInfo } from '@entities/offer/model/types';
import { OfferCard } from '../offer-card';
import { ComponentProps } from 'react';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/hocs';
import { generatePath, Route, Routes } from 'react-router-dom';
import { RoutesEnum } from '@shared/types';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const FAKE_OFFER_PAGE_TEXT = 'Fake offer page';
const FAKE_OFFER_PAGE_ELEMENT = <p>{FAKE_OFFER_PAGE_TEXT}</p>;

const createPropsMock = (offer: MainOfferInfo, isPremium: boolean): ComponentProps<typeof OfferCard> => ({
  offer: {
    ...offer,
    isPremium
  }
});

const FAVORITES_BUTTON_TEXT_PATTERN = /^(to|in) bookmarks/i;
const PREMIUM_MARK_TEXT_PATTERN = /^premium/i;

describe('Component OfferCard', () => {
  const favoriteButtonTestId = 'favorite-button';
  const initialRoute = '/initial-route';
  const ratingContainerTestId = 'rating-container';
  const onActivateOfferMock = vi.fn();
  const onFavoritesButtonClickMock = vi.fn();
  const history = createMemoryHistory();

  beforeEach(() => {
    onActivateOfferMock.mockReset();
    onFavoritesButtonClickMock.mockReset();
    history.replace(initialRoute);
  });

  it('should correct render with is premium offer', () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(<OfferCard {...createPropsMock(offerMock, true)} />);
    const screen = render(component);

    expect(screen.getByText(offerMock.type)).toBeInTheDocument();
    expect(screen.getByText(offerMock.title)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(FAVORITES_BUTTON_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(`€${offerMock.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(offerMock.title)).toBeInTheDocument();
    expect(screen.getByText(PREMIUM_MARK_TEXT_PATTERN)).toBeInTheDocument();
  });

  it('should correct render with is not premium offer', () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(<OfferCard {...createPropsMock(offerMock, false)} />);
    const screen = render(component);

    expect(screen.getByText(offerMock.type)).toBeInTheDocument();
    expect(screen.getByText(offerMock.title)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestId)).toBeInTheDocument(); expect(screen.getByText(FAVORITES_BUTTON_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(`€${offerMock.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(offerMock.title)).toBeInTheDocument();
    expect(screen.queryByText(PREMIUM_MARK_TEXT_PATTERN)).not.toBeInTheDocument();
  });

  it('should navigate to \'OfferPage\' for click by offer image', async () => {
    const offerMock = createMainOfferInfoMock();
    const offerPageUrl = generatePath(RoutesEnum.Offer, { id: offerMock.id });
    const component = withRouter(
      <Routes>
        <Route path={RoutesEnum.Offer} element={FAKE_OFFER_PAGE_ELEMENT} />
        <Route
          path={initialRoute}
          element={
            <OfferCard
              offer={offerMock}
              onActivateOffer={onActivateOfferMock}
              onFavoritesButtonClick={onFavoritesButtonClickMock}
            />
          }
        />
      </Routes>,
      history
    );

    const screen = render(component);
    await userEvent.click(screen.getByAltText(offerMock.title));

    expect(screen.getByText(FAKE_OFFER_PAGE_TEXT)).toBeInTheDocument();
    expect(history.location.pathname).toBe(offerPageUrl);
  });

  it('should navigate to \'OfferPage\' for click by offer title', async () => {
    const offerMock = createMainOfferInfoMock();
    const offerPageUrl = generatePath(RoutesEnum.Offer, { id: offerMock.id });
    const component = withRouter(
      <Routes>
        <Route path={RoutesEnum.Offer} element={FAKE_OFFER_PAGE_ELEMENT} />
        <Route
          path={initialRoute}
          element={
            <OfferCard
              offer={offerMock}
              onActivateOffer={onActivateOfferMock}
              onFavoritesButtonClick={onFavoritesButtonClickMock}
            />
          }
        />
      </Routes>,
      history
    );

    const screen = render(component);
    await userEvent.click(screen.getByText(offerMock.title));

    expect(screen.getByText(FAKE_OFFER_PAGE_TEXT)).toBeInTheDocument();
    expect(history.location.pathname).toBe(offerPageUrl);
  });

  it('should call \'onActivateOffer\' callback if card in focus', async () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(
      <OfferCard
        offer={offerMock}
        onActivateOffer={onActivateOfferMock}
        onFavoritesButtonClick={onFavoritesButtonClickMock}
      />
    );

    const screen = render(component);
    await userEvent.hover(screen.getByAltText(offerMock.title));

    expect(onActivateOfferMock.mock.lastCall).toEqual([offerMock.id]);
    expect(onActivateOfferMock).toBeCalledTimes(1);
  });

  it('should call \'onFavoritesButtonClick\' callback if favorite button clicked', async () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(
      <OfferCard
        offer={offerMock}
        onActivateOffer={onActivateOfferMock}
        onFavoritesButtonClick={onFavoritesButtonClickMock}
      />,
      history
    );

    const screen = render(component);
    await userEvent.click(screen.getByTestId(favoriteButtonTestId));

    expect(onFavoritesButtonClickMock.mock.lastCall).toEqual([
      offerMock.id,
      !offerMock.isFavorite
    ]);
    expect(onFavoritesButtonClickMock).toBeCalledTimes(1);
  });
});
