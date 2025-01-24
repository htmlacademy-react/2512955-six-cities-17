import { MainOfferInfo } from '@entities/offer/model/types';
import { OfferCard } from '../offer-card';
import { ComponentProps } from 'react';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/hocs';

const createPropsMock = (offer: MainOfferInfo, isPremium: boolean): ComponentProps<typeof OfferCard> => ({
  offer: {
    ...offer,
    isPremium
  },
  onActivateOffer: vi.fn(),
  onFavoritesButtonClick: vi.fn(),
});

describe('Component OfferCard', () => {
  it('should correct render with is premium offer', () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(<OfferCard {...createPropsMock(offerMock, true)} />);
    const screen = render(component);

    expect(screen.getByText(offerMock.type)).toBeInTheDocument();
    expect(screen.getByText(offerMock.title)).toBeInTheDocument();
    expect(screen.container.querySelector('.place-card__rating.rating')).not.toBeNull();
    expect(screen.getByText(/^to bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(`€${offerMock.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(offerMock.title)).toBeInTheDocument();
    expect(screen.getByText(/^premium/i)).toBeInTheDocument();
  });

  it('should correct render with is not premium offer', () => {
    const offerMock = createMainOfferInfoMock();
    const component = withRouter(<OfferCard {...createPropsMock(offerMock, false)} />);
    const screen = render(component);

    expect(screen.getByText(offerMock.type)).toBeInTheDocument();
    expect(screen.getByText(offerMock.title)).toBeInTheDocument();
    expect(screen.container.querySelector('.place-card__rating.rating')).not.toBeNull();
    expect(screen.getByText(/^to bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(`€${offerMock.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(offerMock.title)).toBeInTheDocument();
    expect(screen.queryByText(/^premium/i)).not.toBeInTheDocument();
  });
});
